// default.ts
import { ContactsValues, FormValues } from "./types";

export const defaultValues: FormValues = {
  photo: undefined,
  organizationName: "",
  managerName: "",
  phoneOrganization: "",
  emailOrganization: "",
  inn: [],
  kpp: [],
  nds: "",
  bankDetails: "",
  legalAddress: "",
  postalAddress: "",
  workshopAddress: "",
  ogrn: "",
  okpo: "",
  okved: "",
  declarations: [],
  startDateOfCooperation: "",
  dateOfFirstDelivery: "",
  chiefAccountant: "",
  additionalContacts: [],
  companyHistory: "",
};

export const defaultContactsValues: ContactsValues = {
  contacts: [],
};
