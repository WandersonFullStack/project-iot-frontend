import { useState, useEffect } from "react";
import { Search, SquareX } from "lucide-react";

import { plcService } from "../../services/plcService";
import { PLCOut } from "../../types";
import { UpdatePLC, CancelButton, FormModal } from "../index";

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
    const [ plcRefresh, setPlcRefresh ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ isForm, setIsForm ] = useState(false);
    const [ activeView, setActiveView ] = useState<ActiveView | null>(null);


    useEffect(() => { 
        async function fetchPlc () {
            try {
                const response = await plcService.item(controllerId);
                setPlc(response);
            } catch {
                setError("Erro ao carregar PLC.");
            } finally {
                setLoading(false);
            }
        };
        fetchPlc();
    }, [controllerId, plcRefresh]);

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
                            <FormModal>
                                <CancelButton onClick={handleFormClose}>
                                    <SquareX/>
                                </CancelButton>

                                {activeView === 'updatePLC' &&
                                        <UpdatePLC 
                                            plcId={plc.id} 
                                            onSuccess={() => {
                                                setPlcRefresh(r => r + 1);
                                            }}
                                        />
                                        
                                }

                                {activeView === 'createRegister' &&
                                    <CreateRegister />
                                }

                                {activeView === 'updateRegister' &&
                                    <UpdateRegister />
                                }

                            </FormModal>
                        )}
                    </DashSection>
                </Container>
            )}
        </>
    );
};