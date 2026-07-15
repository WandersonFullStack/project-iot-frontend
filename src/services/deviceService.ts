import { api } from "./authService";

import { DeviceIn, DeviceOut, DeviceUpdate, PLCOut, MessageOut, RenewalKeyOut } from "../types";

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

    async update(deviceId: string, deviceData: DeviceUpdate): Promise<DeviceUpdate> {
        const response = await api.patch(`api/v1/devices/${deviceId}`, deviceData);
        return response.data;
    },

    async plcByDevice(deviceId: string): Promise<PLCOut | null> {
        const response = await api.get(`api/v1/devices/${deviceId}/plc`);
        return response.data;
    },

    async messages(deviceId: string): Promise<MessageOut[]> {
        const response = await api.get(`api/v1/devices/${deviceId}/messages`);
        return response.data;
    },

    async renewKey(deviceId: string): Promise<RenewalKeyOut> {
        const response = await api.post(`api/v1/devices${deviceId}/renew`);
        return response.data;
    }
}
