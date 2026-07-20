import { useEffect, useRef } from "react";

import { MessageOut } from "../types";

const WS_URL = import.meta.env.VITE_API_URL?.replace('http', 'ws') || 'ws://localhost:8000';

type WsMessage = {
    device_id: string;
    topic: string;
    payload: string | null;
    qos: number;
    retain: boolean;
};

export function useDeviceWebSocket(
    deviceId: string,
    onMessage: (msg: MessageOut) => void
) {
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const ws = new WebSocket(`${WS_URL}/api/v1/ws?token=${token}`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const data: WsMessage = JSON.parse(event.data);

            if (data.device_id !== deviceId) return;

            const newMsg: MessageOut = {
                id: Date.now(),
                topic: data.topic,
                payload: data.payload,
                qos: data.qos,
                retain: data.retain,
                content_type: null,
                user_props: null,
                received_in: new Date(),
            };

            onMessage(newMsg);
        };

        ws.onerror = (err) => {
            return err;
        };

        return () => {
            ws.close();
        };
    }, [deviceId]);

    return wsRef;
}