import { api } from "./authService";

import { DeviceIn, DeviceOut } from "../types";

export const deviceService = {
    async create(deviceData: DeviceIn): Promise<DeviceOut> {
        const response = await api.post('api/v1/devices', deviceData)
        return response.data
    },

}