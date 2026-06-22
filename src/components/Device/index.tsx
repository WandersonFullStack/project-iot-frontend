import { useState } from "react";

import { deviceService } from "../../services/deviceService";

import { Card, CardCreate, FormGroup, CreateButton } from "./styles"

type DeviceFormState = {
    name: string;
    description: string;
    topics: string;
};

export function Device() {
    const [ loading, setLoading ] = useState(false);
    const [ formDevice, setFormDevice ] = useState<DeviceFormState>(
            {
                name: '',
                description: '',
                topics: '',
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
            .split(',')
            .map((topic) => topic.trim())
            .filter(Boolean);

            await deviceService.create({
                name: formDevice.name,
                description: formDevice.description,
                topics,
            })
            setFormDevice({
                name: '',
                description: '',
                topics: '',
            });
        } catch (error) {
            console.error("Erro ao criar device:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card>
            <CardCreate>
                <h2>Create Device</h2>

                <form onSubmit={handleSubmit}>
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

                    <CreateButton type="submit" disabled={loading} >
                        {loading ? "Sending..." : "Send"}
                    </CreateButton>
                </form>
            </CardCreate>
        </Card>
    )
}