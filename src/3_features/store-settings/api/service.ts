import { api } from "@shared/api/api";
import { StoreStatusRo, StoreStatusRoData } from "../config";

export class StoreSettingsService {
  static async getStoreStatus(ip: string): Promise<StoreStatusRoData> {
    const response = await api.post<StoreStatusRo>("/door-store/remote", {
      ip,
      type: "status",
      command: false,
    });
    return response.data.data;
  }
  static async openDoor(ip: string, open: boolean): Promise<unknown> {
    const response = await api.post<unknown>("/door-store/remote", {
      ip,
      type: "openDoor",
      command: open,
    });
    return response.data;
  }
  static async reboot(ip: string): Promise<unknown> {
    const response = await api.post<unknown>("/door-store/remote", {
      ip,
      type: "reboot",
      command: true,
    });
    return response.data;
  }
  static async emergencyClosure(
    ip: string,
    enabled: boolean,
  ): Promise<unknown> {
    const response = await api.post<unknown>("/door-store/remote", {
      ip,
      type: "emergencyClosure",
      command: enabled,
    });
    return response.data;
  }
  static async toggleNightMode(ip: string, enabled: boolean): Promise<unknown> {
    const response = await api.post<unknown>("/door-store/remote", {
      ip,
      type: "remote",
      command: enabled,
    });
    return response.data;
  }
}
