import { useState, useEffect } from "react";
import { Search, SquareX } from "lucide-react";

import { plcService } from "../../services/deviceService";
import { PLCOut } from "../../types";
import { UpdatePLC, CancelButton, Popup } from "../index";

import {
    Container, 
    PlcHeader,
    SearchArea,
    Title,
    DashSection,
    PlcConfig,
    ConfigContent,
} from "./styles"

type PlcProps = {
    controllerId: number;
};

type ActiveView = 'updatePLC' | 'createRegister' | 'updateRegister' ;

export function Plc({controllerId}: PlcProps) {
    const [ plc, setPlc ] = useState<PLCOut | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ isForm, setIsForm ] = useState(false)
    const [ activeView, setActiveView ] = useState<ActiveView | null>(null);


    const loadPlc = async () => {
        try {
            const response = await plcService.item(controllerId);
            setPlc(response);
        } catch {
            setError("Erro ao carregar PLC.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlc();
    }, [controllerId]);

    const handleUpdatePlc = () => {
        setActiveView('updatePLC');
        setIsForm(true);
    };

    const handleCreateRegister = () => {
        setActiveView('createRegister');
        setIsForm(true);
    };

    const handleUpdateRegister = () => {
        setActiveView('updateRegister');
        setIsForm(true);
    };

    const handleFormClose = () => {
        setIsForm(false);
    };

    if (loading) return <span>Carregando PLC...</span>

    if (error) return <span>{error}</span>

    return (
        <>
            {plc && (
                <Container key={plc.id}>
                    <PlcHeader >
                        <Title>{plc.name}</Title>

                        <SearchArea>
                            <button className="button-search">
                                <Search size={20} />
                            </button>
                            <input type="search" placeholder="Search Register"/>
                        </SearchArea>

                        <PlcConfig>
                            <ConfigContent>
                                <a onClick={handleUpdatePlc}>
                                    Update PLC
                                </a>
                                <a onClick={handleCreateRegister}>
                                    Create Register
                                </a>
                                <a onClick={handleUpdateRegister}>
                                    Update Register
                                </a>
                            </ConfigContent>
                        </PlcConfig>
                    </PlcHeader>
                    
                    <DashSection>
                        {isForm && (
                            <Popup>
                                <CancelButton onClick={handleFormClose}>
                                    <SquareX/>
                                </CancelButton>

                                {activeView === 'updatePLC' &&
                                        <UpdatePLC 
                                            plcId={plc.id} 
                                            onSuccess={() => {
                                                setActiveView(null);
                                                loadPlc();
                                            }}
                                        />
                                        
                                }

                                {activeView === 'createRegister' &&
                                    <CreateRegister />
                                }

                                {activeView === 'updateRegister' &&
                                    <UpdateRegister />
                                }

                            </Popup>
                        )}
                    </DashSection>
                </Container>
            )}
        </>
    );
};