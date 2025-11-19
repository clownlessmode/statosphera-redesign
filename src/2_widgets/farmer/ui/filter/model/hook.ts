// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../config/schema";
import { useFiltersStore } from "@widgets/farmer/model/filters-store";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "../config/types";
import { defaultValues } from "../config/default";

const useForm = () => {
  const {
    photo,
    organizationName,
    phoneNumber,
    email,
    inn,
    legalAddress,
    workshopAddress,
    periodDeclar,
    startDateCooper,
    dateFirstDelivery,
    personalization,
    companyHistory,
  } = useFiltersStore((state) => state.filters);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      photo: photo || defaultValues.photo,
      organizationName: organizationName || defaultValues.organizationName,
      phoneNumber: phoneNumber || defaultValues.phoneNumber,
      email: email || defaultValues.email,
      inn: inn || defaultValues.inn,
      legalAddress: legalAddress || defaultValues.legalAddress,
      workshopAddress: workshopAddress || defaultValues.workshopAddress,
      periodDeclar: periodDeclar || defaultValues.periodDeclar,
      startDateCooper: startDateCooper || defaultValues.startDateCooper,
      dateFirstDelivery: dateFirstDelivery || defaultValues.dateFirstDelivery,
      personalization: personalization || defaultValues.personalization,
      companyHistory: companyHistory || defaultValues.companyHistory,
    },
    mode: "all",
  });

  return form;
};

export default useForm;

//export const useNameSegments = () => {
//  const [nameSegmentOptions, setNameSegmentOptions] = useState<
//    MultiSelectOption[]
//  >([]);
//
//  const { nameSegment, isNameSegmentLoading } = useRfm();
//
//  const handleOpenNameSegment = async (isOpen: boolean) => {
//    if (!isOpen) return;
//
//    try {
//      const apiOptions = nameSegment!.map((nameSegment) => ({
//        label: `${nameSegment.rfmCode}. ${nameSegment.rfmName}`,
//        value: String(nameSegment.rfmCode || ""),
//      }));
//      setNameSegmentOptions(apiOptions);
//    } catch (error) {
//      console.error("Ошибка при загрузке сегментов:", error);
//    }
//  };
//
//  return { nameSegmentOptions, handleOpenNameSegment, isNameSegmentLoading };
//};
//
//export const useAgePeriods = () => {
//  const [agePeriodsOptions, setNameSegmentOptions] = useState<
//    MultiSelectOption[]
//  >([]);
//
//  const { agePeriods, isAgePeriodsLoading } = useRfm();
//
//  const handleOpenAgePeriods = async (isOpen: boolean) => {
//    if (!isOpen) return;
//
//    try {
//      const apiOptions = agePeriods!.map((agePeriod) => ({
//        label: `${agePeriod}`,
//        value: String(agePeriod || ""),
//      }));
//      setNameSegmentOptions(apiOptions);
//    } catch (error) {
//      console.error("Ошибка при загрузке возраста:", error);
//    }
//  };
//
//  return { agePeriodsOptions, handleOpenAgePeriods, isAgePeriodsLoading };
//};
