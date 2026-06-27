import { useState, useEffect } from "react";

import { plcService } from "../../services/deviceService";
import { PLCOut } from "../../types";

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
        <div>
            {plc && (
                <div key={plc.id}>
                    <h3>{plc.name}</h3>
                    <span>{plc.active}</span>
                </div>
            )}
        </div>
    );
};