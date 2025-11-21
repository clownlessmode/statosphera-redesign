// default.ts
import { FormValues } from "./types";

export const defaultValues: FormValues = {
  photo: [] as unknown as FileList,
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
  startDateCooper: "",
  dateFirstDelivery: "",
  chiefAccountant: {
    name: "",
    phone: "",
    email: "",
    position: "Главный бухгалтер",
  },
  responsiblePerson: {
    name: "",
    phone: "",
    email: "",
    position: "Ответственное лицо",
  },
  mainContact: {
    name: "",
    phone: "",
    email: "",
    position: "",
  },
  additionalContacts: [],
  personalization: "",
  companyHistory: "",
};
