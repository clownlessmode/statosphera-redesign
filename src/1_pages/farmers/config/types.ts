export interface FarmersResponse {
  idUser: string;
  inn: string[];
  organizationName: string;
  phoneOrganization: string;
  emailOrganization: string;
  legalAddress: string;
  workshopAddress: string;
  nds: string;
  bankDetails: string;
  postalAddress: string;
  ogrn: string;
  okpo: string;
  okved: string;
  managerName: string;
  chiefAccountant: string;
  startDateOfCooperation?: string;
  dateOfFirstDelivery?: string;
  photo?: string;
  companyHistory?: string;
  kpp: string[];
  additionalContacts: {
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];
  kmContacts: {
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];
  declarations: {
    idDeclarations: number;
    nameDeclaration: string;
    dateEndDeclaration: string;
    photoDeclaration: string | null;
  }[];
  agreementUrl: string;
}
