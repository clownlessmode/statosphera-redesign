import { useQuery } from "@tanstack/react-query";
import { AlertTypeService } from "./service";

export const useAlertTypeService = () => {
  const getAlertTypes = useQuery({
    queryKey: ["alert-types"],
    queryFn: AlertTypeService.getAlertTypes,
  });

  return {
    alertTypes: getAlertTypes.data,
    isAlertTypesLoading: getAlertTypes.isPending,
  };
};
