import { useState } from "react";

import { plcService } from "../../services/plcService";

import { 
    CardUpdate, 
    FormGroup, 
    CreateButton, 
} from "./styles";

type Props = {
    plcId: number;
    onSuccess: () => void;
};

type PlcFormUpdate = {
    name: string;
    ip: string;
    port_modbus: number;
    port_tcp: number;
    protocol: string;
    description: string;
    unit_id: number;
    timeout: number;
    active: boolean;
};


export function UpdatePLC({plcId, onSuccess}: Props) {
    const [ loading, setLoading ] = useState(false);
    const [ formPlc, setFormPlc ] = useState<PlcFormUpdate>(
        {
            name: "",
            ip: "",
            port_modbus: 502,
            port_tcp: 9000,
            protocol: "modbus",
            description: "",
            unit_id: 255,
            timeout: 5,
            active: true
        }
    );
    
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

            await plcService.update(plcId, {
                name: formPlc.name || null,
                ip: formPlc.ip || null,
                port_modbus: formPlc.port_modbus,
                port_tcp: formPlc.port_tcp,
                protocol: formPlc.protocol,
                description: formPlc.description || null,
                unit_id: formPlc.unit_id,
                timeout: formPlc.timeout,
                active: formPlc.active,
            });
            setFormPlc({
                name: "",
                ip: "",
                port_modbus: 502,
                port_tcp: 9000,
                protocol: "modbus",
                description: "",
                unit_id: 255,
                timeout: 5,
                active: true
            });
            onSuccess();
        } catch (error) {
            console.error("Erro ao atualizar PLC:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CardUpdate>
                <h2>Update PLC</h2>

                <form id="form-modal" onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="name">Name: </label>
                        <input 
                            name="name"
                            type="text"
                            value={formPlc.name}
                            onChange={handleChange}
                            minLength={3}
                            maxLength={40} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="ip">IP Address: </label>
                        <input 
                            name="ip"
                            type="text"
                            value={formPlc.ip}
                            onChange={handleChange}
                            placeholder="192.168.1.10" 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="port_modbus">Modbus Port: </label>
                        <input 
                            name="port_modbus"
                            type="number"
                            value={formPlc.port_modbus}
                            onChange={handleChange}
                            min={1}
                            max={65535} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="port_tcp">TCP Port: </label>
                        <input 
                            name="port_tcp"
                            type="number"
                            value={formPlc.port_tcp}
                            onChange={handleChange}
                            min={1}
                            max={65535} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="protocol">Protocol: </label>
                        <select 
                            name="protocol"
                            value={formPlc.protocol}
                            onChange={handleChange}
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
                        <label htmlFor="unit_id">Unit ID: </label>
                        <input 
                            name="unit_id"
                            type="number"
                            value={formPlc.unit_id}
                            onChange={handleChange}
                            min={1}
                            max={255} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="timeout">Timeout (s): </label>
                        <input 
                            name="timeout"
                            type="number"
                            value={formPlc.timeout}
                            onChange={handleChange}
                            min={1} 
                        />
                    </FormGroup>
                </form>

                <CreateButton form="form-modal" type="submit" disabled={loading} >
                    {loading ? "Sending..." : "Send"}
                </CreateButton>
            </CardUpdate>
        </>
    );
}