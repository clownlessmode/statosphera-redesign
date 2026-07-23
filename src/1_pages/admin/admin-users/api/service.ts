import { api } from "@shared/api/api";

import { NONE } from "../config/constants";
import { AdminUsersResponse } from "./types";

const validateParams = (params: Record<string, unknown>) => {
  const result: Record<string, unknown> = {};

  for (const key in params) {
    const raw = params[key];
    const value = typeof raw === "string" ? raw.trim() : raw;

    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== NONE
    ) {
      result[key] = value;
    }
  }

  return result;
};

export class AdminUsersService {
  static async getUsers(params: Record<string, unknown>) {
    const validParams = validateParams(params);

    const response = await api.get<AdminUsersResponse>("admin-users", {
      params: validParams,
    });

    return response.data;
  }
}
