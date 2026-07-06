import { useState, useEffect } from "react";
import { Info } from "lucide-react";

import { deviceService } from "../../services/deviceService";
import { DeviceOut, PLCOut } from "../../types";

import { 
    CardContainer, 
    CardDevice, 
    TitleDevice, 
    Status, 
    FooterDevice
} from "./styles";

type PropsDevice = {
    deviceId: string;
};

export function Device({deviceId}: PropsDevice) {
    const [ device, setDevice ] = useState<DeviceOut | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ existPlc, setExistPlc ] = useState<PLCOut | null>(null);
    
    useEffect(() => {
        const loadDevice = async () => {
            try {
                const response = await deviceService.item(deviceId);
                setDevice(response);
            } catch {
                setError("Erro ao carregar dispositivo.");
            } finally {
                setLoading(false);
            }
        };

        loadDevice();
    }, [deviceId]);

    useEffect(() => {
        const loadPlc = async () => {
            try {
                const response = await deviceService.plcByDevice(deviceId);
                setExistPlc(response);
            } catch {
                setError("Erro ao buscar PLC.");
            }
        };
        
        loadPlc();
    }, [deviceId]);

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
                                
                            <div className="info" data-tooltip={device.description}>
                                <Info size={20}/>
                            </div>

                        </div>
                        <div>

                        </div>
                        <FooterDevice>
                            {existPlc && (
                                <>
                                    <h3>
                                        <p>PLC active: </p>
                                        {existPlc.name}
                                    </h3>
                                </>
                            )}
                        </FooterDevice>
                    </CardDevice>
                }
            </CardContainer>
            
        </>
    );
}