import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { useMemo } from "react";

export const useForm = ({ product }: { product: FormValues }) => {
  const {
    directionProducts,
    groupFranchise,
    groupsEconomist,
    idGroupMain,
    idProduct,
    managerAuto,
    ppProducts,
    seasonalityProducts,
    subDivisionProducts,
    subGroups,
    subSubGroups,
    teamProducts,
    typeProducts,
    isImProducts,
  } = product;

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      directionProducts: Array.isArray(directionProducts)
        ? directionProducts.map(String)
        : defaultValues.directionProducts,
      groupFranchise: Array.isArray(groupFranchise)
        ? groupFranchise.map(String)
        : defaultValues.groupFranchise,
      groupsEconomist: Array.isArray(groupsEconomist)
        ? groupsEconomist.map(String)
        : defaultValues.groupsEconomist,
      idGroupMain: Array.isArray(idGroupMain)
        ? idGroupMain.map(String)
        : defaultValues.idGroupMain,
      idProduct: Array.isArray(idProduct)
        ? idProduct.map(String)
        : defaultValues.idProduct,
      managerAuto: Array.isArray(managerAuto)
        ? managerAuto.map(String)
        : defaultValues.managerAuto,
      seasonalityProducts: Array.isArray(seasonalityProducts)
        ? seasonalityProducts.map(String)
        : defaultValues.seasonalityProducts,
      subDivisionProducts: Array.isArray(subDivisionProducts)
        ? subDivisionProducts.map(String)
        : defaultValues.subDivisionProducts,
      subGroups: Array.isArray(subGroups)
        ? subGroups.map(String)
        : defaultValues.subGroups,
      subSubGroups: Array.isArray(subSubGroups)
        ? subSubGroups.map(String)
        : defaultValues.subSubGroups,
      teamProducts: Array.isArray(teamProducts)
        ? teamProducts.map(String)
        : defaultValues.teamProducts,
      typeProducts: Array.isArray(typeProducts)
        ? typeProducts.map(String)
        : defaultValues.typeProducts,
      ppProducts: ppProducts ?? defaultValues.ppProducts,
      isImProducts: isImProducts ?? defaultValues.isImProducts,
    },
    mode: "onChange",
  });

  const isFieldValid = (fieldValue: any) => {
    if (Array.isArray(fieldValue)) {
      return (
        fieldValue.length > 0 &&
        !fieldValue.every((val) => val === "0" || val === 0)
      );
    }
    return (
      fieldValue !== null &&
      fieldValue !== undefined &&
      fieldValue !== "0" &&
      fieldValue !== 0
    );
  };

  const requiredFields = [
    "groupFranchise",
    "subGroups",
    "subSubGroups",
    "typeProducts",
    "directionProducts",
    "groupsEconomist",
    "idGroupMain",
    "seasonalityProducts",
  ] as const;

  const isFormValid = useMemo(() => {
    const values = form.getValues();
    return requiredFields.every((fieldName) => isFieldValid(values[fieldName]));
  }, [form.watch()]);

  const getFieldError = (fieldName: keyof FormValues) => {
    const value = form.getValues(fieldName);
    if (requiredFields.includes(fieldName as any)) {
      return !isFieldValid(value);
    }
    return false;
  };

  const fieldsWithErrors = useMemo(() => {
    const values = form.getValues();
    return requiredFields.filter(
      (fieldName) => !isFieldValid(values[fieldName]),
    );
  }, [form.watch()]);

  return {
    ...form,
    isFormValid,
    getFieldError,
    fieldsWithErrors,
    isFieldValid,
  };
};
