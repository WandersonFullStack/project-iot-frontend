import { useState, useEffect } from "react";
import { Cog, Search } from "lucide-react";

import { plcService } from "../../services/deviceService";
import { PLCOut } from "../../types";

import {
    Container, 
    PlcHeader,
    SearchArea,
    ConfigButton,
    Title,
    DashSection
} from "./styles"

type PlcProps = {
    controllerId: number;
};

export function Plc({controllerId}: PlcProps) {
    const [ plc, setPlc ] = useState<PLCOut | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
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

        loadPlc()
    }, [controllerId]);

    if (loading) return <span>Carregando PLC...</span>

    if (error) return <span>{error}</span>

    return (
        <>
            {plc && (
                <Container key={plc.id}>
                    <PlcHeader>
                        <Title>{plc.name}</Title>

                        <SearchArea>
                            <button className="button-search">
                                <Search size={22} />
                            </button>
                            <input type="search" placeholder="Search Register"/>
                        </SearchArea>

                        <ConfigButton>
                            <Cog size={20}/>
                        </ConfigButton>
                    </PlcHeader>
                    
                    <DashSection>

                    </DashSection>
                </Container>
            )}
        </>
    );
};