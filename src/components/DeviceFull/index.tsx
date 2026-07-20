import { useState, useEffect } from "react";
import { SquareX } from "lucide-react";
import toast from "react-hot-toast";
// import { Doughnut } from "react-chartjs-2";
import Speedometer from "react-d3-speedometer";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { deviceService } from "../../services/deviceService";
import { useDeviceWebSocket } from "../../services/useDeviceWebSocket";
import { DeviceOut, MessageOut } from "../../types";
import { UpdateDevice, FormModal, CancelButton } from "../index";

import {
    Container,
    ContentSection,
    Card,
    MetricsCard,
    ContentMetric,
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

ChartJS.register(ArcElement, Tooltip, Legend);

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

    useDeviceWebSocket(deviceId, (newMsg) => {
        setIsMessages(prev => [newMsg, ...prev]);
    });

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

    const latestPayload = isMessages[0]?.payload ?? null;
    const numericValue = latestPayload !== null ? parseFloat(latestPayload) : NaN;
    const isNumeric = !isNaN(numericValue);

    const GAUGE_MAX = 350;
    const gaugeValue = isNumeric ? Math.min(Math.max(numericValue, 0), GAUGE_MAX) : 0;

    // const gaugeData = {
    //     labels: ['Value', ''],
    //     datasets: [{
    //         data: [gaugeValue, GAUGE_MAX - gaugeValue],
    //         backgroundColor: ['#08692d', '#1c1c2e'],
    //         borderWidth: 0,
    //         circumference: 180,
    //         rotation: 270,
    //     }],
    // };

    // const gaugeOptions = {
    //     plugins: {
    //         legend: { display: false},
    //         Tooltip: { enabled: false},
    //     },
    //     cutout: '75%',
    // };

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

                                        {/* <div style={{ position: 'relative' }}>
                                            <Doughnut data={gaugeData} options={gaugeOptions} />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '0',
                                                width: '100%',
                                                textAlign: 'center',
                                                color: '#a6adc8',
                                            }}>
                                                <strong style={{ fontSize: '1.4rem' }}>
                                                    {isNumeric ? numericValue : latestPayload ?? '-'}
                                                </strong>
                                                <div style={{ fontSize: '0.7rem', color: '#6c7086' }}>
                                                    {isMessages[0]?.topic ?? 'latest'}
                                                </div>
                                            </div>
                                        </div> */}
                                        <ContentMetric>
                                            <Speedometer
                                                maxValue={GAUGE_MAX}
                                                value={gaugeValue}
                                                needleColor="#a6adc8"
                                                startColor="#08692d"
                                                endColor="#EB0D09"
                                                segments={5}
                                                currentValueText={`${numericValue}`}
                                                textColor="#a6adc8"
                                                width={360}
                                                height={270}
                                            />
                                        </ContentMetric>
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
                                            <TableItem scope="col">Properties</TableItem>
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