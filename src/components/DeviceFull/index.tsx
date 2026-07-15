import { useState, useEffect } from "react";
import { SquareX } from "lucide-react";
import toast from "react-hot-toast";

import { deviceService } from "../../services/deviceService";
import { DeviceOut, MessageOut } from "../../types";
import { UpdateDevice, FormModal, CancelButton } from "../index";

import {
    Container,
    ContentSection,
    Card,
    MetricsCard,
    ContentCard,
    Button,
    MessagesTable,
    Table,
    TableHead,
    TableContent,
    TableItem,
    TableBody,
    TableValue,
    PopupOverlay,
    PopupCard
} from "./styles";

type PropsDevice = {
    deviceId: string;
};

type ActiveView = 'device-view' | 'update-form' | 'NewAPIKey';

export function DeviceFull({deviceId}: PropsDevice) {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ device, setDevice ] = useState<DeviceOut | null>(null);
    const [ deviceRefresh, setDeviceRefresh ] = useState(0);
    const [ isMessages, setIsMessages ] = useState<MessageOut[]>([]);
    const [ newAPIKey, setNewAPIKey ] = useState<string | null>(null);
    const [ copied, setCopied ] = useState(false);
    const [ activeView, setActiveView ] = useState<ActiveView | null>('device-view');

    useEffect(() => {
        async function fetchDevice() {
            try {
                const response = await deviceService.item(deviceId);
                setDevice(response);
            } catch {
                setError('Error loading device!');
            } finally {
                setLoading(false);
            }
        };
        fetchDevice();
    }, [deviceId, deviceRefresh]);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const response = await deviceService.messages(deviceId);
                setIsMessages(response);
            } catch {
                setError("Erro ao carregar mensagens!")
            }
        };
        loadMessages();
    }, [deviceId]);

    useEffect(() => {
        async function fetchApiKey() {
            try {
                const response = await deviceService.renewKey(deviceId);
                setNewAPIKey(response.api_key);
                setCopied(false);
            } catch (error) {
                return error
            }
        };
        fetchApiKey();
    }, [deviceId]);

    const handleOpenForm = () => {
        setActiveView('update-form')
    };

    const handleFormClose = () => {
        setActiveView('device-view');
    };

    const handleNewApiKey= () => {
        setActiveView('NewAPIKey')
    };

    const handleCopyNewApiKey = async () => {
        if (!newAPIKey) return;

        try {
            await navigator.clipboard.writeText(newAPIKey);
            setCopied(true);
            toast.success('Copied successfully!', {
                position: "top-right",
                removeDelay: 5000,
            });
        } catch {
            toast.error('Error at copied!', {
                position: "top-right",
                removeDelay: 5000,
            })
        }
    };

    if (loading) return <span>Loading device...</span>
    if (error) return <span>{error}</span>
    
    return (
        <>
            {device && (
                <Container>
                    {activeView === 'device-view' &&
                        <>
                            <ContentSection key={device.device_id}>
                                <Card>
                                    <MetricsCard>
                                        <h3>{device.name}</h3>

                                    </MetricsCard>
                                    <div className="actions">
                                        <Button onClick={handleOpenForm}>
                                            Unpdate
                                        </Button>
                                        <Button onClick={handleNewApiKey}>
                                            Renewal Key
                                        </Button>
                                    </div>
                                </Card>

                                <Card>
                                    <div className="content" >
                                        <ContentCard>
                                            <h3>Topics</h3>
                                            <ul>
                                                {device.topics.map((topic, index) => (
                                                    <li key={`${topic}-${index}`} >
                                                        {topic}
                                                    </li>
                                                ))}
                                            </ul>
                                        </ContentCard>
                                    </div>

                                    <div className="content" >
                                        <ContentCard>
                                            <h3>Description</h3>
                                            <p>{device.description}</p>
                                        </ContentCard>
                                    </div>
                                </Card>
                            </ContentSection>
                            
                            <MessagesTable>
                                <Table>
                                    <TableHead>
                                        <TableContent>
                                            <TableItem scope="col">Topic</TableItem>
                                            <TableItem scope="col">Payload</TableItem>
                                            <TableItem scope="col">QoS</TableItem>
                                            <TableItem scope="col">Retain</TableItem>
                                            <TableItem scope="col">Content-Type</TableItem>
                                            <TableItem scope="col">Properts</TableItem>
                                            <TableItem scope="col">Received-in</TableItem>
                                        </TableContent>
                                    </TableHead>
                                    <TableBody>
                                        {isMessages.map((message) => (
                                            <TableContent key={message.id}>
                                                <TableValue>{message.topic}</TableValue>
                                                <TableValue>{message.payload ?? '-'}</TableValue>
                                                <TableValue>{message.qos}</TableValue>
                                                <TableValue>{message.retain ? 'Yes' : 'No'}</TableValue>
                                                <TableValue>{message.content_type ?? '-'}</TableValue>
                                                <TableValue>{message.user_props ?? '-'}</TableValue>
                                                <TableValue>
                                                    {new Date(message.received_in).toLocaleString()}
                                                </TableValue>
                                            </TableContent>
                                        ))}
                                    </TableBody>
                                </Table>
                            </MessagesTable>
                        </>
                    }

                    {activeView === 'update-form' && 
                        <FormModal>
                            <CancelButton onClick={handleFormClose}>
                                <SquareX/>
                            </CancelButton>

                            <UpdateDevice
                                deviceId={device?.device_id} 
                                onSuccess={() => {
                                    setDeviceRefresh(r => r + 1);
                                    handleFormClose();
                                }}/>
                        </FormModal>
                    }

                    {activeView === 'NewAPIKey' && newAPIKey &&
                        (<PopupOverlay>
                            <PopupCard>
                                <h3>API key successfully renewed !</h3>
                                <p>
                                    Save this api_key now.
                                    <br />
                                    It cannot be recovered later.
                                    <br />
                                    It must be used to authenticate the signature of an IoT device.
                                </p>

                                <textarea readOnly value={newAPIKey} rows={1} />

                                <div className="popup-actions">
                                    <button onClick={handleCopyNewApiKey} >
                                        {copied ? 'Copiado' : 'Copiar'}
                                    </button>
                                    <button onClick={handleFormClose} >
                                        Done
                                    </button>
                                </div>
                            </PopupCard>
                        </PopupOverlay>)
                    }
                </Container>

            )};
        </>
    )
}