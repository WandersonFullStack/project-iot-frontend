import { useState, useEffect, useRef } from "react";

import { parsePayload, registerService } from "../../services/registerService";
import { MapRegisterOut, MessageOut, ModbusPayload } from "../../types";

import {
    Container,
    Card
} from "./styles";

type Props = {
    plcId: number;
    registerId: number;
};

const WS_URL = import.meta.env.VITE_API_URL?.replace('http', 'ws') || 'ws://localhost:8000';

export function Register({plcId, registerId}: Props) {
    const [ isItem, setIsItem ] = useState<MapRegisterOut | null>(null);

    useEffect(() => {
        async function fetchRegister() {
            try {
                const response = await registerService.item(plcId, registerId);
                setIsItem(response);
            } catch (error) {
                return error
            }
        }
        fetchRegister();
    }, [plcId, registerId]);
    
    const wsRef = useRef<WebSocket | null>(null);
    const [regValue, setRegValue ] = useState<ModbusPayload | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const ws = new WebSocket(`${WS_URL}/api/v1/ws?token=${token}`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const msg: MessageOut = JSON.parse(event.data);
            const data = parsePayload(msg.payload);
            setRegValue(data);
        };

        ws.onerror = (err) => {
            return err;
        };

        return () => {
            ws.close();
        };
    });
    

    return (
        <Container>
            {isItem && 
                <Card key={isItem.id} >
                    <h3>{isItem.topic}</h3>
                    <span>{regValue?.value} {regValue?.unit}</span>
                </Card>
            }
        </Container>
    )
}