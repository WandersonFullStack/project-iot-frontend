import { useState, useEffect } from "react";

import { deviceService } from "../../services/deviceService";
import { DeviceOut } from "../../types";

import { CardContainer } from "./styles"

type PropsDevice = {
    deviceId: string;
}

export function Device({deviceId}: PropsDevice) {
    const [ device, setDevice ] = useState<DeviceOut | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    
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

    if (loading) return <span>Carregando dispositivo...</span>;
    if (error) return <span>{error}</span>;

    return (
        <CardContainer>
            {device &&
                <div key={device.device_id}>
                    <h3>{device.name}</h3>
                    <p>{device.description}</p>
                    <p>{device.topics.join(', ')} </p>
                    <span>{device.status}</span>
                </div>
            }
        </CardContainer>
    );
}