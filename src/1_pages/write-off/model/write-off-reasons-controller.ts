import { useCallback } from "react";
import { useWriteOffController } from "../api/controller";
import { useWriteOffReasonsStore } from "./write-off-reasons-store";
import { transformToReasonsDto } from "../utils/transform-reasons-dto";
import { FiltersState } from "@widgets/write-off/sheet/model/filters-store";

export const useWriteOffReasonsController = () => {
  const { getReasons, isReasonsLoading } = useWriteOffController();
  const { setReasons, setLoading, setError, clearReasons } =
    useWriteOffReasonsStore();

  const fetchReasons = useCallback(
    async (filters: FiltersState) => {
      try {
        setLoading(true);
        setError(null);

        const payload = transformToReasonsDto(filters);
        const response = await getReasons(payload);

        setReasons(response.data);
      } catch (error) {
        console.error("Error fetching write-off reasons:", error);
        setError(
          error instanceof Error ? error.message : "Ошибка загрузки данных",
        );
      } finally {
        setLoading(false);
      }
    },
    [getReasons, setReasons, setLoading, setError],
  );

  return {
    fetchReasons,
    isReasonsLoading,
    clearReasons,
  };
};
