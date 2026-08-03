import { useState } from "react";
import { toast } from "react-hot-toast";
import { registerService } from "../../services/registerService";
import { CreateButton, FormGroup, CardCreate } from "./styles";

type Props = {
    plcId: number;
    onRegisterCreated: () => void;
};

type RegisterFormState = {
    type: string;
    address: number;
    topic: string;
    description: string;
    unit: string;
    scale: number;
    offset: number;
    qos: number;
    read_only: boolean;
};

export function AddRegister({plcId, onRegisterCreated}: Props) {
    const [ loading, setLoading ] = useState(false);
    const [ formRegister, setFormRegister ] = useState<RegisterFormState>(
        {
            type: "",
            address: 0,
            topic: "",
            description: "",
            unit: "",
            scale: 1,
            offset: 0,
            qos: 1,
            read_only: true,
        },
    );

    const handleChand = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numberFields = ["address", "scale", "offset", "qos"];

        setFormRegister((prev) => ({
            ...prev,
            [name]: numberFields.includes(name) ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await registerService.create(plcId, {
                type: formRegister.type,
                address: formRegister.address,
                topic: formRegister.topic,
                description: formRegister.description || null,
                unit: formRegister.unit,
                scale: formRegister.scale,
                offset: formRegister.offset,
                qos: formRegister.qos,
                read_only: formRegister.read_only
            });
            setFormRegister({
                type: "",
                address: 0,
                topic: "",
                description: "",
                unit: "",
                scale: 1,
                offset: 0,
                qos: 1,
                read_only: true,
            });
            onRegisterCreated();
        } catch {
            toast.error(
                'Erro ao criar Registrador!',
                {
                    position: "top-right",
                    removeDelay: 5000,
                }
            )
        } finally {
            setLoading(false);
        }
    };

    return (
        <CardCreate>
            <h2>Add Registers</h2>

            <form id="form-modal" onSubmit={handleSubmit}>
                <FormGroup>
                    <label htmlFor="type">Type: *</label>
                    <select 
                        name="type"
                        value={formRegister.type}
                        onChange={handleChand}
                        required
                    >
                        <option value="holding">Holding</option>
                        <option value="input">Input</option>
                        <option value="coil">Coil</option>
                        <option value="discrete">Discrete</option>
                    </select>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="address">Address: *</label>
                    <input 
                        type="number"
                        name="address"
                        value={formRegister.address}
                        onChange={handleChand}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="topic">Topic: *</label>
                    <input 
                        type="text"
                        name="topic"
                        value={formRegister.topic}
                        onChange={handleChand}
                        required
                        placeholder="boiler/temperature"
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="description">Description:</label>
                    <input 
                        type="text"
                        name="description"
                        value={formRegister.description}
                        onChange={handleChand}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="unit">Unit of measurement: *</label>
                    <input 
                        type="text"
                        name="unit"
                        value={formRegister.unit}
                        onChange={handleChand}
                        required
                        placeholder="°C"
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="scale">Scale: *</label>
                    <input 
                        type="number"
                        name="scale"
                        value={formRegister.scale}
                        onChange={handleChand}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="offset">Offset: *</label>
                    <input 
                        type="number"
                        name="offset"
                        value={formRegister.offset}
                        onChange={handleChand}
                        required 
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="qos">QoS: *</label>
                    <input 
                        type="number"
                        name="qos"
                        value={formRegister.qos}
                        onChange={handleChand}
                        required 
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="read_only">Read Only: *</label>
                    <select 
                        name="read_only"
                        value={formRegister.read_only.toString()}
                        onChange={handleChand}
                        required
                    >
                        <option value={true.toString()}>True</option>
                        <option value={false.toString()}>False</option>
                    </select>
                </FormGroup>
            </form>

            <CreateButton form="form-modal" type="submit" disabled={loading} >
                {loading ? "Sending..." : "Send"}
            </CreateButton>
        </CardCreate>
    );
}