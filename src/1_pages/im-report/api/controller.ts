import { ApiError } from "@shared/api/types";
import { useQuery } from "@tanstack/react-query";
import { IMService } from "./service";
import {
  RequestDto,
  getMainCardsRO,
  getOrdinariesCardsRO,
  getPickupCardsRO,
  getOrderProcessingGraphRO,
  getProceedsGraphRO,
  getChannelsGraphRO,
  getChannelsAgeGraphRO,
  getStoreOrdinaryTableRO,
  getStorePickupTableRO,
  getTopNomenclatureRO,
  getPenetrationOfflineRO,
  getWorstOnlineOfflineRO,
  getAntitopOrderCancellRO,
  getTopPaymentMethodRO,
  getShareIMRO,
  getAvgCheckRO,
} from "../config/types";

export const useIM = (dto: RequestDto) => {
  const mainCards = useQuery<getMainCardsRO, ApiError>({
    queryKey: ["mainCards", dto],
    queryFn: () => IMService.getMainCards(dto),
  });

  const ordinariesCards = useQuery<getOrdinariesCardsRO, ApiError>({
    queryKey: ["ordinariesCards", dto],
    queryFn: () => IMService.getOrdinariesCards(dto),
  });
  const ourselvesCards = useQuery<getMainCardsRO, ApiError>({
    queryKey: ["ourselvesCards", dto],
    queryFn: () => IMService.getOurselvesCards(dto),
  });
  const pickupCards = useQuery<getPickupCardsRO, ApiError>({
    queryKey: ["pickupCards", dto],
    queryFn: () => IMService.getPickupCards(dto),
  });

  const orderProcessingGraph = useQuery<getOrderProcessingGraphRO, ApiError>({
    queryKey: ["orderProcessingGraph", dto],
    queryFn: () => IMService.getOrderProcessingGraph(dto),
  });

  const proceedsGraph = useQuery<getProceedsGraphRO[], ApiError>({
    queryKey: ["proceedsGraph", dto],
    queryFn: () => IMService.getProceedsGraph(dto),
  });

  const channelsGraph = useQuery<getChannelsGraphRO, ApiError>({
    queryKey: ["channelsGraph", dto],
    queryFn: () => IMService.getChannelsGraph(dto),
  });

  const channelsAgeGraph = useQuery<getChannelsAgeGraphRO, ApiError>({
    queryKey: ["channelsAgeGraph", dto],
    queryFn: () => IMService.getChannelsAgeGraph(dto),
  });

  const storeOrdinaryTable = useQuery<getStoreOrdinaryTableRO, ApiError>({
    queryKey: ["storeOrdinaryTable", dto],
    queryFn: () => IMService.getStoreOrdinaryTable(dto),
  });

  const storePickupTable = useQuery<getStorePickupTableRO, ApiError>({
    queryKey: ["storePickupTable", dto],
    queryFn: () => IMService.getStorePickupTable(dto),
  });

  const topNomenclature = useQuery<getTopNomenclatureRO, ApiError>({
    queryKey: ["topNomenclature", dto],
    queryFn: () => IMService.getTopNomenclature(dto),
  });

  const penetrationOffline = useQuery<getPenetrationOfflineRO, ApiError>({
    queryKey: ["penetrationOffline", dto],
    queryFn: () => IMService.getPenetrationOffline(dto),
  });

  const worstOnlineOffline = useQuery<getWorstOnlineOfflineRO, ApiError>({
    queryKey: ["worstOnlineOffline", dto],
    queryFn: () => IMService.getWorstOnlineOffline(dto),
  });

  const antitopOrderCancell = useQuery<getAntitopOrderCancellRO, ApiError>({
    queryKey: ["antitopOrderCancell", dto],
    queryFn: () => IMService.getAntitopOrderCancell(dto),
  });

  const topPaymentMethod = useQuery<getTopPaymentMethodRO, ApiError>({
    queryKey: ["topPaymentMethod", dto],
    queryFn: () => IMService.getTopPaymentMethod(dto),
  });

  // Роуты для отчетов ИМ
  const shareIM = useQuery<getShareIMRO[], ApiError>({
    queryKey: ["shareIM", dto],
    queryFn: () => IMService.getShareIM(dto),
  });

  const avgCheck = useQuery<getAvgCheckRO[], ApiError>({
    queryKey: ["avgCheck", dto],
    queryFn: () => IMService.getAvgCheck(dto),
  });

  return {
    mainCards: mainCards.data,
    isMainCardsLoading: mainCards.isLoading,
    errorMainCards: mainCards.error,

    ordinariesCards: ordinariesCards.data,
    isOrdinariesCardsLoading: ordinariesCards.isLoading,
    errorOrdinariesCards: ordinariesCards.error,

    ourselvesCards: ourselvesCards.data,
    isOurselvesCardsLoading: ourselvesCards.isLoading,
    errorOurselvesCards: ourselvesCards.error,

    pickupCards: pickupCards.data,
    isPickupCardsLoading: pickupCards.isLoading,
    errorPickupCards: pickupCards.error,

    orderProcessingGraph: orderProcessingGraph.data,
    isOrderProcessingGraphLoading: orderProcessingGraph.isLoading,
    errorOrderProcessingGraph: orderProcessingGraph.error,

    proceedsGraph: proceedsGraph.data,
    isProceedsGraphLoading: proceedsGraph.isLoading,
    errorProceedsGraph: proceedsGraph.error,

    channelsGraph: channelsGraph.data,
    isChannelsGraphLoading: channelsGraph.isLoading,
    errorChannelsGraph: channelsGraph.error,

    channelsAgeGraph: channelsAgeGraph.data,
    isChannelsAgeGraphLoading: channelsAgeGraph.isLoading,
    errorChannelsAgeGraph: channelsAgeGraph.error,

    storeOrdinaryTable: storeOrdinaryTable.data,
    isStoreOrdinaryTableLoading: storeOrdinaryTable.isLoading,
    errorStoreOrdinaryTable: storeOrdinaryTable.error,

    storePickupTable: storePickupTable.data,
    isStorePickupTableLoading: storePickupTable.isLoading,
    errorStorePickupTable: storePickupTable.error,

    topNomenclature: topNomenclature.data,
    isTopNomenclatureLoading: topNomenclature.isLoading,
    errorTopNomenclature: topNomenclature.error,

    penetrationOffline: penetrationOffline.data,
    isPenetrationOfflineLoading: penetrationOffline.isLoading,
    errorPenetrationOffline: penetrationOffline.error,

    worstOnlineOffline: worstOnlineOffline.data,
    isWorstOnlineOfflineLoading: worstOnlineOffline.isLoading,
    errorWorstOnlineOffline: worstOnlineOffline.error,

    antitopOrderCancell: antitopOrderCancell.data,
    isAntitopOrderCancellLoading: antitopOrderCancell.isLoading,
    errorAntitopOrderCancell: antitopOrderCancell.error,

    topPaymentMethod: topPaymentMethod.data,
    isTopPaymentMethodLoading: topPaymentMethod.isLoading,
    errorTopPaymentMethod: topPaymentMethod.error,

    shareIM: shareIM.data,
    isShareIMLoading: shareIM.isLoading,
    errorShareIM: shareIM.error,

    avgCheck: avgCheck.data,
    isAvgCheckLoading: avgCheck.isLoading,
    errorAvgCheck: avgCheck.error,
  };
};
