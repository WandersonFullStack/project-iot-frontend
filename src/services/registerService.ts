import { api } from "./authService";

import { MapRegisterIn, MapRegisterOut, MapRegisterUpdate, ModbusPayload } from "../types";


export const registerService = {
    async create(plcId: number, registerData: MapRegisterIn): Promise<MapRegisterOut> {
        const response = await api.post(`api/v1/plcs/${plcId}/registers`, registerData);
        return response.data;
    },

    async list(plcId: number): Promise<MapRegisterOut[]> {
        const response = await api.get(`api/v1/plcs/${plcId}/registers`);
        return response.data;
    },

    async item(plcId: number, registerId: number): Promise<MapRegisterOut> {
        const response = await api.get(`api/v1/plcs/${plcId}/registers/${registerId}`);
        return response.data;
    },

    async update(plcId: number, registerId: number, registerData: MapRegisterUpdate): Promise<MapRegisterOut> {
        const response = await api.patch(`api/v1/plcs/${plcId}/registers/${registerId}`, registerData);
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