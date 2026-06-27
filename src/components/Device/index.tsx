import { useState, useEffect } from "react";
import { Info } from "lucide-react";

import { deviceService } from "../../services/deviceService";
import { DeviceOut } from "../../types";

import { CardContainer, CardDevice, TitleDevice, Status} from "./styles"

type PropsDevice = {
    deviceId: string;
};

// type typeValue = boolean | number | null;


export function Device({deviceId}: PropsDevice) {
    const [ device, setDevice ] = useState<DeviceOut | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    // const [ value, setValue ] = useState<typeValue>(null);
    
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

    if (loading) return <span>Carregando dispositivo...</span>
    if (error) return <span>{error}</span>

    const isStatus = device?.status === 'offline';

    return (
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
                </CardDevice>
            }
        </CardContainer>
    );
}