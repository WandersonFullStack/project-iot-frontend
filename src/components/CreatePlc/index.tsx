import { useEffect, useState } from "react";

import { deviceService } from "../../services/deviceService";
import { plcService } from "../../services/plcService";
import { DeviceOut } from "../../types";

import { 
    CardCreate, 
    FormGroup, 
    CreateButton, 
} from "./styles";

type PlcFormState = {
    device_id: string
    name: string;
    ip: string;
    port_modbus: number;
    port_tcp: number;
    protocol: string;
    description: string;
    unit_id: number;
    timeout: number;
};

type Props = {
    onSuccess: () => void;
}


export function CreatePlc({onSuccess}: Props) {
    const [ loading, setLoading ] = useState(false);
    const [ devices, setDevices] = useState<DeviceOut[]>([])
    const [ formPlc, setFormPlc ] = useState<PlcFormState>(
        {
            device_id: "",
            name: "",
            ip: "",
            port_modbus: 502,
            port_tcp: 9000,
            protocol: "modbus",
            description: "",
            unit_id: 255,
            timeout: 5
        }
    );

    useEffect(() => {
        deviceService.list().then((data) => {
            setDevices(data as unknown as DeviceOut[]);
        });
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numericFields = ["port_modbus", "port_tcp", "unit_id", "timeout"];

        setFormPlc((prev) => ({
                ...prev,
                [name]: numericFields.includes(name) ? Number(value) : value,
            }));
        };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {

            await plcService.create({
                device_id: formPlc.device_id,
                name: formPlc.name,
                ip: formPlc.ip,
                port_modbus: formPlc.port_modbus,
                port_tcp: formPlc.port_tcp,
                protocol: formPlc.protocol,
                description: formPlc.description || null,
                unit_id: formPlc.unit_id,
                timeout: formPlc.timeout
            });
            setFormPlc({
                device_id: "",
                name: "",
                ip: "",
                port_modbus: 502,
                port_tcp: 9000,
                protocol: "modbus",
                description: "",
                unit_id: 255,
                timeout: 5
            });
            onSuccess();
        } catch (error) {
            console.error("Erro ao criar PLC:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CardCreate>
                <h2>Create PLC</h2>

                <form id="form-modal" onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="device_id">Dvice: *</label>
                        <select 
                            name="device_id" 
                            value={formPlc.device_id}
                            onChange={handleChange}
                            required
                        >
                            <option>Select a device</option>
                            {devices.map((device) => (
                                <option key={device.device_id} value={device.device_id}>
                                    {device.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="name">Name: *</label>
                        <input 
                            name="name"
                            type="text"
                            value={formPlc.name}
                            onChange={handleChange}
                            required
                            minLength={3}
                            maxLength={40} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="ip">IP Address: *</label>
                        <input 
                            name="ip"
                            type="text"
                            value={formPlc.ip}
                            onChange={handleChange}
                            required
                            placeholder="192.168.1.10" 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="port_modbus">Modbus Port: *</label>
                        <input 
                            name="port_modbus"
                            type="number"
                            value={formPlc.port_modbus}
                            onChange={handleChange}
                            required
                            min={1}
                            max={65535} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="port_tcp">TCP Port: *</label>
                        <input 
                            name="port_tcp"
                            type="number"
                            value={formPlc.port_tcp}
                            onChange={handleChange}
                            required
                            min={1}
                            max={65535} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="protocol">Protocol: *</label>
                        <select 
                            name="protocol"
                            value={formPlc.protocol}
                            onChange={handleChange}
                            required
                        >
                            <option value="modbus">Modbus</option>
                            <option value="tcp">TCP</option>
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="description">Description:</label>
                        <input 
                            name="description"
                            type="text"
                            value={formPlc.description}
                            onChange={handleChange}
                            maxLength={255} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="unit_id">Unit ID: *</label>
                        <input 
                            name="unit_id"
                            type="number"
                            value={formPlc.unit_id}
                            onChange={handleChange}
                            required
                            min={1}
                            max={255} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="timeout">Timeout (s): *</label>
                        <input 
                            name="timeout"
                            type="number"
                            value={formPlc.timeout}
                            onChange={handleChange}
                            required
                            min={1} 
                        />
                    </FormGroup>
                </form>

                <CreateButton form="form-modal" type="submit" disabled={loading} >
                    {loading ? "Sending..." : "Send"}
                </CreateButton>
                
            </CardCreate>
        </>
    );
}