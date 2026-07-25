import { api } from "./authService";

import { MapRegisterOut, ModbusPayload } from "../types";


export const registerService = {
    async list(plcId: number): Promise<MapRegisterOut[]> {
        const response = await api.get(`api/v1/plcs/${plcId}/registers`);
        return response.data;
    },

    async item(plcId: number, registerId: number): Promise<MapRegisterOut> {
        const response = await api.get(`api/v1/plcs/${plcId}/registers/${registerId}`);
        return response.data;
    },
}


export function parsePayload(raw: string | null): ModbusPayload | null {
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw);
        if (typeof parsed.value === 'number' && typeof parsed.unit === 'string') {
            return parsed as ModbusPayload;
        }
        return null;
    } catch {
        return null;
    }
}