import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  farmerApprovalSchema,
  labelApprovalSchema,
  mrpRevisionSchema,
  ndFillSchema,
  ndRevisionSchema,
} from "./schema";
import { z } from "zod";

export type FarmerApprovalFormValues = z.infer<typeof farmerApprovalSchema>;
export type LabelApprovalFormValues = z.infer<typeof labelApprovalSchema>;
export type MrpRevisionFormValues = z.infer<typeof mrpRevisionSchema>;
export type NdRevisionFormValues = z.infer<typeof ndRevisionSchema>;
export type NdFillFormValues = z.infer<typeof ndFillSchema>;

export const useFarmerApprovalForm = () =>
  useForm<FarmerApprovalFormValues>({
    resolver: zodResolver(farmerApprovalSchema),
    mode: "all",
  });

export const useLabelApprovalForm = () =>
  useForm<LabelApprovalFormValues>({
    resolver: zodResolver(labelApprovalSchema),
    mode: "all",
  });

export const useMrpRevisionForm = () =>
  useForm<MrpRevisionFormValues>({
    resolver: zodResolver(mrpRevisionSchema),
    mode: "all",
  });

export const useNdRevisionForm = () =>
  useForm<NdRevisionFormValues>({
    resolver: zodResolver(ndRevisionSchema),
    mode: "all",
  });

export const useNdFillForm = () =>
  useForm<NdFillFormValues>({
    resolver: zodResolver(ndFillSchema),
    mode: "all",
  });
