import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { RfmService } from "./service";
import {
  EighthCalculationResponse,
  EleventhCalculationResponse,
  FifteenCalculationResponse,
  FifthCalculationResponse,
  FirstCalculationResponse,
  FourteenCalculationResponse,
  FourthCalculationResponse,
  NameSegmentResponse,
  NinthCalculationResponse,
  RequestDto,
  SecondCalculationResponse,
  SeventhCalculationResponse,
  SixteenCalculationResponse,
  SixthCalculationResponse,
  TenthCalculationResponse,
  ThirdCalculationResponse,
  ThirteenthCalculationResponse,
  TwelfthCalculationResponse,
} from "../config";

export const useRfm = () => {
  const queryClient = useQueryClient();

  const nameSegment = useQuery<NameSegmentResponse[], ApiError>({
    queryKey: ["nameSegment"],
    queryFn: async () => {
      const response = await RfmService.getNameSegment();
      return response;
    },
  });

  const firstCalculation = useMutation<
    FirstCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getFirstCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["firstCalculation"] });
      return response;
    },
  });

  const secondCalculation = useMutation<
    SecondCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getSecondCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["secondCalculation"] });
      return response;
    },
  });

  const secondCalculationReverse = useMutation<
    SecondCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getSecondCalculationReverse(dto);
      queryClient.invalidateQueries({ queryKey: ["secondCalculation"] });
      return response;
    },
  });

  const thirdCalculation = useMutation<
    ThirdCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getThirdCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["thirdCalculation"] });
      return response;
    },
  });
  const fourthCalculation = useMutation<
    FourthCalculationResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getFourthCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["fourthCalculation"] });
      return response;
    },
  });
  const fifthCalculation = useMutation<
    FifthCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getFifthCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["fifthCalculation"] });
      return response;
    },
  });
  const sixthCalculation = useMutation<
    SixthCalculationResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getSixthCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["sixthCalculation"] });
      return response;
    },
  });

  const seventhCalculation = useMutation<
    SeventhCalculationResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getSeventhCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["seventhCalculation"] });
      return response;
    },
  });

  const eighthCalculation = useMutation<
    EighthCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getEighthCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["eighthCalculation"] });
      return response;
    },
  });

  const ninthCalculation = useMutation<
    NinthCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getNinthCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["ninthCalculation"] });
      return response;
    },
  });
  const tenthCalculation = useMutation<
    TenthCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getTenthCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["tenthCalculation"] });
      return response;
    },
  });
  const eleventhCalculation = useMutation<
    EleventhCalculationResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getEleventhCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["eleventhCalculation"] });
      return response;
    },
  });
  const twelfthCalculation = useMutation<
    TwelfthCalculationResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getTwelfthCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["twelfthCalculation"] });
      return response;
    },
  });
  const thirteenthCalculation = useMutation<
    ThirteenthCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getThirteenthCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["thirteenthCalculation"] });
      return response;
    },
  });
  const fourteenCalculation = useMutation<
    FourteenCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getFourteenCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["fourteenCalculation"] });
      return response;
    },
  });

  const fifteenCalculation = useMutation<
    FifteenCalculationResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getFifteenCalculation(dto);
      queryClient.invalidateQueries({ queryKey: ["fifteenCalculation"] });
      return response;
    },
  });

  const sixteenCalculation = useMutation<
    SixteenCalculationResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getSixteenCalculation(dto);
      queryClient.invalidateQueries({
        queryKey: ["sixteenCalculation"],
      });
      return response;
    },
  });

  return {
    getNameSegment: nameSegment.refetch,
    isNameSegmentLoading: nameSegment.isPending,
    nameSegment: nameSegment.data,
    getFirstCalculation: firstCalculation.mutateAsync,
    isFirstCalculationLoading: firstCalculation.isPending,
    getSecondCalculation: secondCalculation.mutateAsync,
    isSecondCalculationLoading: secondCalculation.isPending,
    getSecondCalculationReverse: secondCalculationReverse.mutateAsync,
    isSecondCalculationReverseLoading: secondCalculationReverse.isPending,
    getThirdCalculation: thirdCalculation.mutateAsync,
    isThirdCalculationLoading: thirdCalculation.isPending,
    getFourthCalculation: fourthCalculation.mutateAsync,
    isFourthCalculationLoading: fourthCalculation.isPending,
    getFifthCalculation: fifthCalculation.mutateAsync,
    isFifthCalculationLoading: fifthCalculation.isPending,
    getSixthCalculation: sixthCalculation.mutateAsync,
    isSixthCalculationLoading: sixthCalculation.isPending,
    getSeventhCalculation: seventhCalculation.mutateAsync,
    isSeventhCalculationLoading: seventhCalculation.isPending,
    getEighthCalculation: eighthCalculation.mutateAsync,
    isEighthCalculationLoading: eighthCalculation.isPending,
    getNinthCalculation: ninthCalculation.mutateAsync,
    isNinthCalculationLoading: ninthCalculation.isPending,
    getTenthCalculation: tenthCalculation.mutateAsync,
    isTenthCalculationLoading: tenthCalculation.isPending,
    getEleventhCalculation: eleventhCalculation.mutateAsync,
    isEleventhCalculationLoading: eleventhCalculation.isPending,
    getTwelfthCalculation: twelfthCalculation.mutateAsync,
    isTwelfthCalculationLoading: twelfthCalculation.isPending,
    getThirteenthCalculation: thirteenthCalculation.mutateAsync,
    isThirteenthCalculationLoading: thirteenthCalculation.isPending,
    getFourteenCalculation: fourteenCalculation.mutateAsync,
    isFourteenCalculationLoading: fourteenCalculation.isPending,
    getFifteenCalculation: fifteenCalculation.mutateAsync,
    isFifteenCalculationLoading: fifteenCalculation.isPending,
    getSixteenCalculation: sixteenCalculation.mutateAsync,
    isSixteenCalculationLoading: sixteenCalculation.isPending,
  };
};
