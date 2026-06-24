import {  useEffect, useState } from "react";

import { deviceService } from "../../services/deviceService";
import { DeviceOut } from "../../types";
import { Device } from "../index";

import { Container, SectionDevices } from "./styles";

type DeviceProps = {
    children?: React.ReactNode;
};

export function AllDevices({children}: DeviceProps) {
    const [ devices, setDevices ] = useState<DeviceOut[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const loadDevices = async () => {
            try {
                const response = await deviceService.list();
                setDevices(response);
            } catch {
                setError("Erro ao carregar dispositivos");
            } finally {
                setLoading(false);
            }
        };

        loadDevices();
    }, []);

    if (loading) return <p>Crregando dispositivos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <h2>All Devices</h2>
            <SectionDevices>
                {children}
                {devices.map((device) => (
                    <Device key={device.device_id} deviceId={device.device_id}/>
                ))}
            </SectionDevices>
        </Container>
    )
}