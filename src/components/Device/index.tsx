import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Speedometer from "react-d3-speedometer";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { deviceService } from "../../services/deviceService";
import { useDeviceWebSocket } from "../../services/useDeviceWebSocket";
import { plcService } from "../../services/plcService";
import { DeviceOut, MessageOut, PLCOut } from "../../types";

import { 
    CardContainer, 
    CardDevice, 
    TitleDevice, 
    Status, 
    FooterDevice,
    TrashButton
} from "./styles";

type PropsDevice = {
    deviceId: string;
};

ChartJS.register(ArcElement, Tooltip, Legend);

export function Device({deviceId}: PropsDevice) {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ device, setDevice ] = useState<DeviceOut | null>(null);
    const [ existPlc, setExistPlc ] = useState<PLCOut | null>(null);
    const [ plcRefresh, setPlcRefresh ] = useState(0);
    const [ isMessage, setIsMessages ] = useState<MessageOut[]>([]);
    
    useEffect(() => {
        async function fetchDevice() {
            try {
                const response = await deviceService.item(deviceId);
                setDevice(response);
            } catch {
                setError("Erro ao carregar dispositivo.");
            } finally {
                setLoading(false);
            }
        };
        fetchDevice();
    }, [deviceId]);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const response = await deviceService.messages(deviceId);
                setIsMessages(response);
            } catch (error) {
                return error
            }
        }
        loadMessages();
    }, [deviceId]);

    useDeviceWebSocket(deviceId, (newMsg) => {
        setIsMessages(prev => [newMsg, ...prev]);
    });

    useEffect(() => {
        async function fetchPlc() {
            try {
                const response = await deviceService.plcByDevice(deviceId);
                setExistPlc(response);
            } catch {
                setError("Erro ao buscar PLC.");
            }
        };
        fetchPlc();
    }, [deviceId, plcRefresh]);        

    const handleDeletePlc = async (plcId: number) => {
        try {
            await plcService.delete(plcId);
            alert('PLC deletado com sucesso!');
            setPlcRefresh(r => r + 1);
        } catch {
            alert('Erro ao deletar PLC.');
        }
    };

    const latestPayload = isMessage[0]?.payload ?? null;
    const numericValue = latestPayload !== null ? parseFloat(latestPayload) : NaN;
    const isNumeric = !isNaN(numericValue);

    const GAUGE_MAX = 350;
    const gaugeValue = isNumeric ? Math.min(Math.max(numericValue, 0), GAUGE_MAX) : 0;


    if (loading) return <span>Carregando dispositivo...</span>
    if (error) return <span>{error}</span>

    const isStatus = device?.status === 'offline';


    return (
        <>
            <CardContainer>
                {device &&
                    
                    <CardDevice key={device.device_id}>
                        <div className="header">                            
                            <TitleDevice>
                                {device.name} 
                            </TitleDevice>

                            <Status $isStatus={isStatus}>
                                {device.status}
                            </Status>
                        </div>
                        <div className="chart-container">
                            <Speedometer
                                maxValue={GAUGE_MAX}
                                value={gaugeValue}
                                needleColor="#a6adc8"
                                startColor="#08692d"
                                endColor="#EB0D09"
                                segments={5}
                                currentValueText={`${numericValue}`}
                                textColor="#a6adc8"
                                width={230}
                                height={150}
                            />
                        </div>
                        <FooterDevice>
                            <p>PLC active: </p>
                            {existPlc ? (
                                <>
                                    <h3>{existPlc.name}</h3>
                                    <TrashButton onClick={() => handleDeletePlc(existPlc.id)}>
                                        <Trash2  size={18}/>
                                    </TrashButton>
                                </>
                            ) : (
                                <p>none</p>
                            )}
                        </FooterDevice>
                    </CardDevice>
                }

                
            </CardContainer>
            
        </>
    );
}