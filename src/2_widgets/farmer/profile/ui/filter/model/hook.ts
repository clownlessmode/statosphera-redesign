// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../config/schema";
import { useFarmerProfileStore } from "@widgets/farmer/profile/model/profile-store";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "../config/types";
import { defaultValues } from "../config/default";

const useForm = () => {
  const {
    photo,
    organizationName,
    managerName,
    phoneOrganization,
    emailOrganization,
    inn,
    kpp,
    nds,
    legalAddress,
    postalAddress,
    workshopAddress,
    ogrn,
    okpo,
    okved,
    declarations,
    startDateOfCooperation,
    dateOfFirstDelivery,
    chiefAccountant,
    responsiblePerson,
    mainContact,
    additionalContacts,
    companyHistory,
  } = useFarmerProfileStore((state) => state.filters);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      photo: photo || defaultValues.photo,
      organizationName: organizationName || defaultValues.organizationName,
      managerName: managerName || defaultValues.managerName,
      phoneOrganization: phoneOrganization || defaultValues.phoneOrganization,
      emailOrganization: emailOrganization || defaultValues.emailOrganization,
      inn: inn || defaultValues.inn,
      kpp: kpp || defaultValues.kpp,
      nds: nds || defaultValues.nds,
      legalAddress: legalAddress || defaultValues.legalAddress,
      postalAddress: postalAddress || defaultValues.postalAddress,
      workshopAddress: workshopAddress || defaultValues.workshopAddress,
      ogrn: ogrn || defaultValues.ogrn,
      okpo: okpo || defaultValues.okpo,
      okved: okved || defaultValues.okved,
      declarations: declarations || defaultValues.declarations,
      startDateOfCooperation:
        startDateOfCooperation || defaultValues.startDateOfCooperation,
      dateOfFirstDelivery:
        dateOfFirstDelivery || defaultValues.dateOfFirstDelivery,
      chiefAccountant: chiefAccountant || defaultValues.chiefAccountant,
      responsiblePerson: responsiblePerson || defaultValues.responsiblePerson,
      mainContact: mainContact || defaultValues.mainContact,
      additionalContacts:
        additionalContacts || defaultValues.additionalContacts,
      companyHistory: companyHistory || defaultValues.companyHistory,
    },
    mode: "all",
  });

  return form;
};

export default useForm;
