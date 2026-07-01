import { api } from "./authService";

import { DeviceIn, DeviceOut, PLCIn, PLCOut } from "../types";

export const deviceService = {
    async create(deviceData: DeviceIn): Promise<DeviceOut> {
        const response = await api.post('api/v1/devices', deviceData)
        return response.data
    },

    async list(): Promise<DeviceOut> {
        const response = await api.get('api/v1/devices');
        return response.data;
    },

    async item(deviceId: string): Promise<DeviceOut> {
        const response = await api.get(`api/v1/devices/${deviceId}`);
        return response.data;
    },

    async plcByDevice(deviceId: string): Promise<PLCOut | null> {
        const response = await api.get(`api/v1/devices/${deviceId}/plc`);
        return response.data;
    }
}

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

    async update(plcId: number): Promise<PLCOut> {
        const response = await api.patch(`api/v1/plcs/${plcId}`);
        return response.data;
    },

}