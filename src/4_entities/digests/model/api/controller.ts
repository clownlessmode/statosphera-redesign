import { useQuery } from "@tanstack/react-query";
import { DigestsService } from "./service";
import { GetDigestsResponse, GetDigestResponse } from "../types";

export const useDigests = (id?: string) => {
  const digests = useQuery<GetDigestsResponse>({
    queryKey: ["digests"],
    queryFn: () => DigestsService.getDigests(),
  });

  const digest = useQuery<GetDigestResponse>({
    queryKey: ["digest"],
    queryFn: () => DigestsService.getDigest(id as string),
    enabled: !!id,
  });

  return {
    digests: digests.data,
    isDigestsLoading: digests.isLoading,

    digest: digest.data,
    isDigestLoading: digest.isLoading,
  };
};
