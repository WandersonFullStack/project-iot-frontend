import { useState, useEffect } from "react";
import { Search, SquareX } from "lucide-react";

import { plcService } from "../../services/plcService";
import { registerService } from "../../services/registerService";
import { MapRegisterOut, PLCOut,  } from "../../types";
import { UpdatePLC, CancelButton, FormModal, Register, AddRegister, RegisterTable } from "../index";

import {
    Container, 
    PlcHeader,
    SearchArea,
    Title,
    DashSection,
    RegisterContainer,
    PlcConfig,
    ConfigContent,
} from "./styles"

type PlcProps = {
    controllerId: number;
    children?: React.ReactNode;
};

type ActiveView = 'registers' | 'updatePLC' | 'createRegister' | 'updateRegister' ;

export function Plc({controllerId, children}: PlcProps) {
    const [ plc, setPlc ] = useState<PLCOut | null>(null);
    const [ plcRefresh, setPlcRefresh ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ isForm, setIsForm ] = useState(false);
    const [ isRegisters, setIsRegisters ] = useState<MapRegisterOut[]>([]);
    const [ activeView, setActiveView ] = useState<ActiveView | null>('registers');


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

    useEffect(() => {
        const loadRegisters = async () => {
            try {
                const response = await registerService.list(controllerId);
                setIsRegisters(response);
            } catch {
                setError("Erro ao carregar registradores!");
            }
        }
        loadRegisters();
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
    };

    const handleFormClose = () => {
        setIsForm(false);
        setActiveView('registers')
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
                        {activeView === 'registers' &&
                            <RegisterContainer>
                                {children}
                                {isRegisters.map((register) => (
                                    <Register 
                                        key={register.id}
                                        plcId={plc.id} 
                                        registerId={register.id}
                                    />
                                ))}
                            </RegisterContainer>
                        }

                        {activeView === 'updateRegister' &&
                            <RegisterTable
                                plcId={plc.id}
                                registers={isRegisters}
                                onRegisterUpdated={() => {
                                    setPlcRefresh((current) => current + 1);
                                    handleFormClose();
                                }}
                            />
                        }

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
                                    <AddRegister 
                                        plcId={plc.id} 
                                        onRegisterCreated={() => {
                                            setPlcRefresh(r => r + 1);
                                            handleFormClose();
                                        }} 
                                    />
                                }

                            </FormModal>
                        )}
                    </DashSection>
                </Container>
            )}
        </>
    );
};