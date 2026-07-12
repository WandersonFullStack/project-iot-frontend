import { api } from "./authService";

import { PLCIn, PLCOut, PLCUpdate } from "../types";

export const plcService = {
    async create(plcData: PLCIn): Promise<PLCOut> {
        const response = await api.post('api/v1/plcs', plcData);
        return response.data;
    },

    async list(): Promise<PLCOut[]> {
        const response = await api.get('api/v1/plcs');
        return response.data;
    },

    async item(controllerId: number): Promise<PLCOut> {
        const response = await api.get(`api/v1/plcs/${controllerId}`);
        return response.data;
    },

    async update(plcId: number, plcData: PLCUpdate): Promise<PLCUpdate> {
        const response = await api.patch(`api/v1/plcs/${plcId}`, plcData);
        return response.data;
    },

    async delete(plcId: number) {
        await api.delete(`api/v1/plcs/${plcId}`);
    },
}