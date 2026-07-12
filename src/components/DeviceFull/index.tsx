import { useState, useEffect } from "react";
import { SquareX } from "lucide-react";

import { deviceService } from "../../services/deviceService";
import { DeviceOut } from "../../types";
import { UpdateDevice, FormModal, CancelButton } from "../index";

import {
    Container,
    ContentSection,
    Card,
    MetricsCard,
    ContentCard,
    Button 
} from "./styles";

type PropsDevice = {
    deviceId: string;
};

type ActiveView = 'device-view' | 'update-form';

export function DeviceFull({deviceId}: PropsDevice) {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ device, setDevice ] = useState<DeviceOut | null>(null);
    const [ deviceRefresh, setDeviceRefresh ] = useState(0);
    const [ activeView, setActiveView ] = useState<ActiveView | null>('device-view');

    useEffect(() => {
        async function fetchDevice() {
            try {
                const response = await deviceService.item(deviceId);
                setDevice(response);
            } catch {
                setError('Error loading device...');
            } finally {
                setLoading(false);
            }
        };
        fetchDevice();
    }, [deviceId, deviceRefresh]);

    const handleOpenForm = () => {
        setActiveView('update-form')
    };

    const handleFormClose = () => {
        setActiveView('device-view');
    }

    if (loading) return <span>Loading device...</span>
    if (error) return <span>{error}</span>
    
    return (
        <>
            {device && (
                <Container>
                    {activeView === 'device-view' &&
                        <ContentSection key={device.device_id}>
                            <Card>
                                <MetricsCard>
                                    <h3>{device.name}</h3>

                                </MetricsCard>
                                <Button onClick={handleOpenForm}>
                                    Unpdate
                                </Button>
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
                </Container>

            )};
        </>
    )
}