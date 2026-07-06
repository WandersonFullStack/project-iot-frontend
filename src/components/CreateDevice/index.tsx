import { useState } from "react";

import { deviceService } from "../../services/deviceService";
import { Popup } from "../index";

import {
    CardCreate, 
    FormGroup, 
    CreateButton, 
    PopupOverlay, 
    PopupCard 
} from "./styles";

type DeviceFormState = {
    name: string;
    description: string;
    topics: string;
};


export function CreateDevice() {
    const [ loading, setLoading ] = useState(false);
    const [ formDevice, setFormDevice ] = useState<DeviceFormState>(
            {
                name: '',
                description: '',
                topics: '',
            }
        );
    const [ apiKey, setApiKey ] = useState<string | null>(null);
    const [ copied, setCopied ] = useState(false);
    
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

            const response = await deviceService.create({
                name: formDevice.name,
                description: formDevice.description,
                topics,
            });
            setFormDevice({
                name: '',
                description: '',
                topics: '',
            });
            setApiKey(response.api_key);
            setCopied(false);
        } catch (error) {
            console.error("Erro ao criar device:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyApiKey = async () => {
        if (!apiKey) return;

        try {
            await navigator.clipboard.writeText(apiKey);
            setCopied(true);
        } catch (error) {
            console.error("Erro ao copiar api_key:", error);
        }
    };

    const handleClosePopup = () => {
        setApiKey(null);
        setCopied(false);
    };

    return (
        <Popup>
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

            {apiKey && (
                <PopupOverlay>
                    <PopupCard>
                        <h3>Device criado com sucesso !</h3>
                        <p>Salve está api_key agora.
                            <br />
                            Ela não poderá ser recuperada depois.
                            <br />
                            A mesma deverá ser ultilizada para credenciar a assinatura de um dispositivo IoT.
                        </p>
                            
                        <textarea readOnly value={apiKey} rows={1} />

                        <div className="popup-actions">
                            <button onClick={handleCopyApiKey} >
                                {copied ? "Copiado" : "Copiar"}
                            </button>

                            <button onClick={handleClosePopup}>
                                Done
                            </button>
                        </div>
                    </PopupCard>
                </PopupOverlay>
            )}
        </Popup>
    );
}