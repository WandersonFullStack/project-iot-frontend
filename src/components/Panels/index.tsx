import { useState, useEffect } from "react";
import { SquareX, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import Speedometer from "react-d3-speedometer";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    BarElement,
} from "chart.js";

import { deviceService } from "../../services/deviceService";
import { useDeviceWebSocket } from "../../services/useDeviceWebSocket";
import { DeviceOut, MessageOut } from "../../types";
import { UpdateDevice, FormModal, CancelButton } from "../index";

import {
    Container,
    HeaderDevice,
    HinnerHeader,
    ContentMetric,
    Button,
    MessagesTable,
    Table,
    TableHead,
    TableContent,
    TableItem,
    TableBody,
    TableValue,
    PopupOverlay,
    PopupCard,
    Status
} from "./styles";

type PropsDevice = {
    deviceId: string;
};

type ActiveView = 'device-view' | 'update-form' | 'NewAPIKey';

type ChartType = "gauge" | "line" | "bar" | "doughnut";

type TopicChartConfig = {
    id: string;
    topic: string;
    type: ChartType;
    title?: string;
    color?: string;
    maxValue?: number;
    historySize?: number;
};

type DeviceChartConfig = Record<string, TopicChartConfig[]>;

type ChartFormState = {
    topic: string;
    type: ChartType;
    title: string;
    color: string;
    maxValue: number;
    historySize: number;
};

type NumericMessage = MessageOut & {
    value: number;
};

const STORAGE_PREFIX = "device-charts";
const DEFAULT_MAX_VALUE = 350;
const DEFAULT_HISTORY_SIZE = 20;
const DEFAULT_COLOR = "#08692d";

ChartJS.register(
    ArcElement, 
    Tooltip,
    Legend,
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    BarElement
);

function chartStorageKey(deviceId: string) {
    return `${STORAGE_PREFIX}:${deviceId}`;
}

function createChartId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readDeviceCharts(deviceId: string): DeviceChartConfig {
    if (typeof window === "undefined") {
        return {};
    }

    try {
        const raw = window.localStorage.getItem(chartStorageKey(deviceId));
        return raw ? (JSON.parse(raw) as DeviceChartConfig) : {};
    } catch {
        return {};
    }
}

function numericPayload(payload: string | null): number {
    if (payload === null) {
        return Number.NaN;
    }

    try {
        const parsed = JSON.parse(payload);

        if (
            typeof parsed === "object" &&
            parsed !== null &&
            "value" in parsed
        ) {
            return Number(parsed.value);
        }
    } catch (error){
        console.error(error);
    }

    return Number(payload);
}

function buildNumericSeries(mensagens: MessageOut[]): NumericMessage[] {
    return mensagens
        .map((message) => ({
            ...message,
            value: numericPayload(message.payload),
        }))
        .filter((message) => !Number.isNaN(message.value))
        .sort(
            (left, right) => 
                new Date(left.received_in).getTime() - new Date(right.received_in).getTime()
        );
}

function chartTitle(config: TopicChartConfig) {
    return config.title?.trim() || config.topic;
}

function clampValue(value: number, maxValue: number) {
    return Math.min(Math.max(value, 0), maxValue);
}

function metricFromTopic(topic: string) {
    const parts = topic.split("/").filter(Boolean);
    return parts.at(-1) ?? topic;
}

export function Panels({deviceId}: PropsDevice) {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ device, setDevice ] = useState<DeviceOut | null>(null);
    const [ deviceRefresh, setDeviceRefresh ] = useState(0);
    const [ isMessages, setIsMessages ] = useState<MessageOut[]>([]);
    const [ newAPIKey, setNewAPIKey ] = useState<string | null>(null);
    const [ copied, setCopied ] = useState(false);
    const [ activeView, setActiveView ] = useState<ActiveView | null>('device-view');

    const [ chartConfigs, setChartConfigs ] = useState<DeviceChartConfig>(() => readDeviceCharts(deviceId));
    const [ loadedChartsDeviceId, setLoadedChartsDeviceId ] = useState<string | null>(null);
    const [ chartModalOpen, setChartModalOpen ] = useState(false);
    const [ chartForm, setChartForm ] = useState<ChartFormState>({
        topic: "",
        type: "gauge",
        title: "",
        color: DEFAULT_COLOR,
        maxValue: DEFAULT_MAX_VALUE,
        historySize: DEFAULT_HISTORY_SIZE,
    });

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
        const timeoutId = window.setTimeout(() => {
            setChartConfigs(readDeviceCharts(deviceId));
            setLoadedChartsDeviceId(deviceId);
            setChartModalOpen(false);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [deviceId]);

    useEffect(() => {
        if (loadedChartsDeviceId !== deviceId) {
            return;
        }

        window.localStorage.setItem(
            chartStorageKey(deviceId),
            JSON.stringify(chartConfigs)
        );
    }, [chartConfigs, deviceId, loadedChartsDeviceId]);

    useDeviceWebSocket(deviceId, (newMsg) => {
        setIsMessages((current) => [newMsg, ...current]);
    });

    const renewalKey = async () => {
        try {
            const response = await deviceService.renewKey(deviceId);
            setNewAPIKey(response.api_key);
            setCopied(false);
        } catch (error) {
            return error
        }
    };

    const handleOpenForm = () => {
        setChartModalOpen(false);
        setActiveView('update-form')
    };

    const handleFormClose = () => {
        setChartModalOpen(false);
        setActiveView('device-view');
    };

    const handleNewApiKey= () => {
        setChartModalOpen(false);
        setActiveView('NewAPIKey');
        renewalKey();
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

    const openChartModal = (topic: string) => {
        setChartForm({
            topic,
            type: "gauge",
            title: "",
            color: DEFAULT_COLOR,
            maxValue: DEFAULT_MAX_VALUE,
            historySize: DEFAULT_HISTORY_SIZE,
        });
        setChartModalOpen(true);
    };

    const closeChartModal = () => {
        setChartModalOpen(false);
    };

    const saveChartConfig = () => {
        if (!chartForm.topic.trim()) {
            toast.error("Select a topic frist.");
            return;
        }

        const topic = chartForm.topic.trim();
        const nextChart: TopicChartConfig = {
            id: createChartId(),
            topic,
            type: chartForm.type,
            title: chartForm.title.trim() || undefined,
            color: chartForm.color || DEFAULT_COLOR,
            maxValue:
                chartForm.type === "gauge" || chartForm.type === "doughnut" 
                    ? chartForm.maxValue 
                    : undefined,
            historySize:
                chartForm.type === "line" || chartForm.type === "bar" 
                    ? chartForm.historySize 
                    : undefined,
        };

        setChartConfigs((current) => {
            const next = { ...current };
            const list = next[topic] ? [...next[topic]] : [];
            next[topic] = [...list, nextChart];
            return next;
        });

        setChartModalOpen(false);
        toast.success("Chart added to topic.");
    };

    const removeChartConfig = (topic: string, chartId: string) => {
        setChartConfigs((current) => {
            const next = { ...current };
            const nextList = (next[topic] || []).filter((chart) => chart.id !== chartId);

            if (nextList.length === 0) {
                delete next[topic];
            } else {
                next[topic] = nextList;
            }

            return next;
        });
    };

    const renderChart = (config: TopicChartConfig, topicMessages: MessageOut[]) => {
        const numericSeries = buildNumericSeries(topicMessages);
        const title = chartTitle(config);

        if (config.type === "gauge") {
            const latestValue = numericSeries.at(-1)?.value ?? 0;
            const maxValue = config.maxValue ?? DEFAULT_MAX_VALUE;
            const gaugeValue = clampValue(latestValue, maxValue);

            return (
                <ContentMetric>
                    <Speedometer
                        maxValue={maxValue}
                        value={gaugeValue}
                        needleColor="#a6adc8"
                        startColor={config.color ?? DEFAULT_COLOR}
                        endColor="#EB0D09"
                        segments={5}
                        currentValueText={numericSeries.length ? `${latestValue}` : "-"}
                        textColor="#a6adc8"
                        width={280}
                        height={250}
                        paddingVertical={5}
                    />
                </ContentMetric>
            );
        }

        if (numericSeries.length === 0) {
            return <p style={{ color: "#a6adc8"}}>No numeric data yet for this topic.</p>;
        }

        const historySize = config.historySize ?? DEFAULT_HISTORY_SIZE;
        const visibleSeries = numericSeries.slice(-historySize);
        const labels = visibleSeries.map((message) => 
            new Date(message.received_in).toLocaleTimeString()
        );
        const values = visibleSeries.map((message) => message.value);

        if (config.type === "line") {
            return (
                <ContentMetric>
                    <Line
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: title,
                                    data: values,
                                    borderColor: config.color ?? DEFAULT_COLOR,
                                    backgroundColor: `${config.color ?? DEFAULT_COLOR}33`,
                                    tension: 0.35,
                                    pointRadius: 3,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                            },
                            scales: {
                                y: { beginAtZero: true },
                            },
                        }}
                    />
                </ContentMetric>
            );
        }

        if (config.type === "bar") {
            return (
                <ContentMetric>
                    <Bar
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: title,
                                    data: values,
                                    backgroundColor: config.color ?? DEFAULT_COLOR,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                            },
                            scales: {
                                y: { beginAtZero: true },
                            },
                        }}
                    />
                </ContentMetric>
            );
        }

        const maxValue = config.maxValue ?? DEFAULT_MAX_VALUE;
        const latestValue = clampValue(numericSeries.at(-1)?.value ?? 0, maxValue);

        return (
            <ContentMetric>
                <Doughnut
                    data={{
                        labels: [title, "Remaining"],
                        datasets: [
                            {
                                data: [latestValue, Math.max(maxValue - latestValue, 0)],
                                backgroundColor: [config.color ?? DEFAULT_COLOR, "#1c1c2e"],
                                borderWidth: 0,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                        },
                    }}
                />
            </ContentMetric>
        );
    };

    if (loading) return <span>Loading device...</span>
    if (error) return <span>{error}</span>

    const isStatus = device?.status === 'offline';

    const activeCharts = loadedChartsDeviceId === deviceId ? chartConfigs : {};
    
    return (
        <>
            {device && (
                <Container>
                    {activeView === 'device-view' &&
                        <>
                            <HeaderDevice key={device.device_id}>
                                <HinnerHeader>
                                    <h3>
                                        {device.name} 
                                        <Status $isStatus={isStatus}>
                                            {device.status}
                                        </Status>
                                    </h3>

                                    <div className="actions">
                                        <Button onClick={handleOpenForm}>Unpdate</Button>
                                        <Button onClick={handleNewApiKey}>Renewal Key</Button>
                                    </div>
                                </HinnerHeader>
                            </HeaderDevice>

                            <div
                                style={{
                                    width: "calc(100% - 5rem)",
                                    maxWidth: "1600px",
                                    padding: "0 1rem 1.5rem",
                                }}
                            >
                                <div
                                    style={{
                                        background: "none",
                                        color: "#a6adc8",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(4, 1fr)",
                                            gap: "1rem",
                                            maxHeight: "100vh",
                                            paddingRight: "0.25rem",
                                        }}
                                    >
                                        {device.topics.map((topic) => {
                                            const topicMessages = isMessages.filter(
                                                (message) => metricFromTopic(message.topic) === topic
                                            );
                                            const topicCharts = activeCharts[topic] ?? [];

                                            return (
                                                <div
                                                    key={topic}
                                                    style={{
                                                        border: "1px solid #2b3140",
                                                        borderRadius: "12px",
                                                        padding: "0.5rem",
                                                        background: "#0a1020",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            gap: "1rem",
                                                            padding: "0 0.5rem",
                                                            marginBottom: "0.75rem",
                                                        }}
                                                    >
                                                        <div>
                                                            <strong>{topic}</strong>
                                                            <div style={{ fontSize: "0.8rem", color: "#6c7086" }}>
                                                                {topicMessages.length} messages
                                                            </div>
                                                        </div>

                                                        <Button onClick={() => openChartModal(topic)}>
                                                            Add chart
                                                        </Button>
                                                    </div>

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: "1rem",
                                                        }}
                                                    >
                                                        {topicCharts.length === 0 ? (
                                                            <p style={{ margin: 0, color: "#6c7086" }}>
                                                                No charts configured for this topic yet.
                                                            </p>
                                                        ) : (
                                                            topicCharts.map((chart) => (
                                                                <div
                                                                    key={chart.id}
                                                                    style={{
                                                                        border: "1px solid #1f2738",
                                                                        borderRadius: "12px",
                                                                        padding: "1rem",
                                                                        background: "#020814",
                                                                        maxWidth: "100%",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                            alignItems: "center",
                                                                            gap: "1rem",
                                                                            marginBottom: "0.75rem",
                                                                        }}
                                                                    >
                                                                        <div>
                                                                            <strong>{chartTitle(chart)}</strong>
                                                                            <div
                                                                                style={{
                                                                                    fontSize: "0.8rem",
                                                                                    color: "#6c7086",
                                                                                }}
                                                                            >
                                                                                {chart.type.toUpperCase()}
                                                                            </div>
                                                                        </div>

                                                                        <button
                                                                            onClick={() =>
                                                                                removeChartConfig(topic, chart.id)
                                                                            }
                                                                            style={{
                                                                                display: "inline-flex",
                                                                                alignItems: "center",
                                                                                gap: "0.35rem",
                                                                                border: "none",
                                                                                background: "transparent",
                                                                                color: "#c9d1e7",
                                                                                cursor: "pointer",
                                                                            }}
                                                                        >
                                                                            <Trash2 size={16} />
                                                                            Remove
                                                                        </button>
                                                                    </div>

                                                                    {renderChart(chart, topicMessages)}
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                            <MessagesTable>
                                <Table>
                                    <TableHead>
                                        <TableContent>
                                            <TableItem scope="col">Topic</TableItem>
                                            <TableItem scope="col">Value</TableItem>
                                            <TableItem scope="col">QoS</TableItem>
                                            <TableItem scope="col">Retain</TableItem>
                                            <TableItem scope="col">Properties</TableItem>
                                            <TableItem scope="col">Received-in</TableItem>
                                        </TableContent>
                                    </TableHead>
                                    <TableBody>
                                        {isMessages.map((message) => (
                                            <TableContent key={message.id} >
                                                <TableValue>{metricFromTopic(message.topic)}</TableValue>
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

                                <p>device_id: {device.device_id}</p>
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

                    {chartModalOpen && device && (
                        <FormModal>
                            <div
                                style={{
                                    width: "min(760px, 92vw)",
                                    background: "#020814",
                                    color: "#eee",
                                    borderRadius: "16px",
                                    padding: "24px",
                                    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <h3 style={{ margin: 0 }}>Add chart to topic</h3>
                                    <CancelButton onClick={closeChartModal}>
                                        <SquareX />
                                    </CancelButton>
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "1rem",
                                    }}
                                >
                                    <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                        <span>Topic</span>
                                        <select
                                            value={chartForm.topic}
                                            onChange={(e) =>
                                                setChartForm((current) => ({
                                                    ...current,
                                                    topic: e.target.value,
                                                }))
                                            }
                                            style={{
                                                padding: "0.75rem",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <option value="">Select a topic</option>
                                            {device.topics.map((topic) => (
                                                <option key={topic} value={topic}>
                                                    {topic}
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                        <span>Chart type</span>
                                        <select
                                            value={chartForm.type}
                                            onChange={(e) =>
                                                setChartForm((current) => ({
                                                    ...current,
                                                    type: e.target.value as ChartType,
                                                }))
                                            }
                                            style={{
                                                padding: "0.75rem",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <option value="gauge">Gauge</option>
                                            <option value="line">Line</option>
                                            <option value="bar">Bar</option>
                                            <option value="doughnut">Doughnut</option>
                                        </select>
                                    </label>

                                    <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                        <span>Title</span>
                                        <input
                                            value={chartForm.title}
                                            onChange={(e) =>
                                                setChartForm((current) => ({
                                                    ...current,
                                                    title: e.target.value,
                                                }))
                                            }
                                            placeholder="Optional title"
                                            style={{
                                                padding: "0.75rem",
                                                borderRadius: "10px",
                                            }}
                                        />
                                    </label>

                                    <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                        <span>Color</span>
                                        <input
                                            type="color"
                                            value={chartForm.color}
                                            onChange={(e) =>
                                                setChartForm((current) => ({
                                                    ...current,
                                                    color: e.target.value,
                                                }))
                                            }
                                            style={{
                                                height: "44px",
                                                borderRadius: "10px",
                                                border: "none",
                                                padding: "0.25rem",
                                            }}
                                        />
                                    </label>

                                    {(chartForm.type === "gauge" || chartForm.type === "doughnut") && (
                                        <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                            <span>Max value</span>
                                            <input
                                                type="number"
                                                min={1}
                                                value={chartForm.maxValue}
                                                onChange={(e) =>
                                                    setChartForm((current) => ({
                                                        ...current,
                                                        maxValue: Number(e.target.value),
                                                    }))
                                                }
                                                style={{
                                                    padding: "0.75rem",
                                                    borderRadius: "10px",
                                                }}
                                            />
                                        </label>
                                    )}

                                    {(chartForm.type === "line" || chartForm.type === "bar") && (
                                        <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                            <span>History size</span>
                                            <input
                                                type="number"
                                                min={1}
                                                value={chartForm.historySize}
                                                onChange={(e) =>
                                                    setChartForm((current) => ({
                                                        ...current,
                                                        historySize: Number(e.target.value),
                                                    }))
                                                }
                                                style={{
                                                    padding: "0.75rem",
                                                    borderRadius: "10px",
                                                }}
                                            />
                                        </label>
                                    )}
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: "0.75rem",
                                        marginTop: "1.5rem",
                                    }}
                                >
                                    <button
                                        onClick={closeChartModal}
                                        style={{
                                            background: "transparent",
                                            border: "1px solid #6c7086",
                                            color: "#c9d1e7",
                                            padding: "0.75rem 1rem",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveChartConfig}
                                        style={{
                                            background: "#08692d",
                                            border: "none",
                                            color: "#fff",
                                            padding: "0.75rem 1rem",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Save chart
                                    </button>
                                </div>
                            </div>
                        </FormModal>
                    )}
                </Container>

            )};
        </>
    )
}