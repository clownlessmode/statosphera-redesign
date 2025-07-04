import { api } from "@shared/api/api";
import {
  WriteOffGraphRequest,
  WriteOffTableRequest,
  WriteOffTotalRequest,
  WriteOffReasonsRequest,
  WriteOffGraphSeriesArray,
  WriteOffTableResponse,
  WriteOffTotalResponse,
  WriteOffTableDataResponse,
  WriteOffReasonsResponse,
} from "./types";

export class WriteOffService {
  static async getGraph(
    data: WriteOffGraphRequest,
  ): Promise<WriteOffGraphSeriesArray> {
    const response = await api.post<WriteOffGraphSeriesArray>(
      "/write-off/graph",
      data,
    );
    return response.data;
  }

  static async getTable(
    data: WriteOffTableRequest,
  ): Promise<WriteOffTableResponse> {
    const response = await api.post<WriteOffTableDataResponse>(
      "/write-off/all",
      data,
    );

    // API возвращает массив напрямую, преобразуем в нужный формат
    return {
      data: response.data,
      totalRows: response.data.length,
    };
  }

  static async getEquipmentTable(
    data: WriteOffTableRequest,
  ): Promise<WriteOffTableResponse> {
    const response = await api.post<WriteOffTableDataResponse>(
      "/write-off/equipment",
      data,
    );

    // API возвращает массив напрямую, преобразуем в нужный формат
    return {
      data: response.data,
      totalRows: response.data.length,
    };
  }

  static async getTotal(
    data: WriteOffTotalRequest,
  ): Promise<WriteOffTotalResponse> {
    const response = await api.post<WriteOffTotalResponse[]>(
      "/write-off/all_total",
      data,
    );
    // API возвращает массив с одним элементом, берем первый
    return response.data[0];
  }

  static async getReasons(
    data: WriteOffReasonsRequest,
  ): Promise<WriteOffReasonsResponse> {
    const response = await api.post<WriteOffReasonsResponse>(
      "/write-off/reasons",
      data,
    );
    return response.data;
  }
}
