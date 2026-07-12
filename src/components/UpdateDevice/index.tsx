import { useState } from "react";

import { deviceService } from "../../services/deviceService";
import { FormModal } from "../index";

import {
    CardUpdate,
    FormGroup,
    CreateButton
} from "./styles";

type DeviceFormUpdate = {
    name: string;
    description: string;
    topics: string;
    active: boolean;
};

type Props = {
    deviceId: string;
    onSuccess: () => void;
};

export function UpdateDevice({deviceId, onSuccess}: Props) {
    const [ loading, setLoading ] = useState(false);
    const [formDevice, setFormDevice ] = useState<DeviceFormUpdate>(
        {
            name: '',
            description: '',
            topics: '',
            active: true,
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormDevice((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const topics = formDevice.topics
            .split(', ')
            .map((topic) => topic.trim())
            .filter(Boolean);

            await deviceService.update(deviceId, {
                name: formDevice.name,
                description: formDevice.description,
                topics,
                active: formDevice.active,
            });
            setFormDevice({
                name: '',
                description: '',
                topics: '',
                active: true,
            });
            onSuccess();
        } catch (error) {
            console.error("Erro ao atualizar device.", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormModal>
            <CardUpdate>
                <h2>Update Device</h2>
            
                <form id="form-modal" onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="name">Name: *</label>
                        <input 
                            name="name"
                            type="text"
                            value={formDevice.name}
                            onChange={handleChange}
                            required
                            minLength={3}
                            maxLength={40} 
                        />
                    </FormGroup>
            
                    <FormGroup>
                        <label htmlFor="description">Description: *</label>
                        <input 
                            name="description"
                            type="text"
                            value={formDevice.description}
                            onChange={handleChange}
                            maxLength={255} 
                        />
                    </FormGroup>
            
                    <FormGroup>
                        <label htmlFor="topics">Topics: *</label>
                        <input 
                            name="topics"
                            type="text"
                            value={formDevice.topics}
                            onChange={handleChange}
                            required
                            placeholder="house/sensors/temperature" 
                        />
                    </FormGroup>
            
                </form>
                            
                <CreateButton form="form-modal" type="submit" disabled={loading} >
                    {loading ? "Sending..." : "Send"}
                </CreateButton>
            </CardUpdate>
        </FormModal>
    )
}