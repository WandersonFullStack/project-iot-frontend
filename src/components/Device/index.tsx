import { useState, useEffect } from "react";
import { Info, Trash2 } from "lucide-react";

import { deviceService } from "../../services/deviceService";
import { plcService } from "../../services/plcService";
import { DeviceOut, PLCOut } from "../../types";

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


export function Device({deviceId}: PropsDevice) {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ device, setDevice ] = useState<DeviceOut | null>(null);
    const [ existPlc, setExistPlc ] = useState<PLCOut | null>(null);
    const [ plcRefresh, setPlcRefresh ] = useState(0);
    
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
                                                            
                            <div className="info" data-tooltip={device.description}>
                                <Info size={20}/>
                            </div>

                            <Status $isStatus={isStatus}>
                                {device.status}
                            </Status>
                        </div>
                        <div>

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