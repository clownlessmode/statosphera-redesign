export interface RequestDto {
  idUser: number;
  organizationName: string;
  managerName: string;
  phoneOrganization: string;
  emailOrganization: string;
  inn: string[];
  kpp: string[];
  nds: string;
  bankDetails: string;
  legalAddress: string;
  postalAddress: string;
  workshopAddress: string;
  ogrn: string;
  okpo: string;
  okved: string;
  chiefAccountant: string;
  companyHistory: string | null;
  declarations: {
    idDeclarations: number;
    nameDeclaration: string;
    dateEndDeclaration: string | null;
    photoDeclaration?: string;
  }[];
  startDateOfCooperation: string | null;
  dateOfFirstDelivery: string | null;
  additionalContacts: {
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];
}

export interface RequestDtoPhoto {
  photo: File;
  idDeclaration?: number;
}

export interface RequestDtoKmContacts {
  idUser: number;
  contacts: {
    name: string;
    phone: string;
    email: string;
    position: string;
  }[];
}

export interface ProfileResponse {
  idUser: string;
  organizationName: string;
  phoneOrganization: string;
  emailOrganization: string;
  legalAddress: string;
  workshopAddress: string;
  inn: string[];
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
  declarations: {
    idDeclarations: number;
    nameDeclaration: string;
    dateEndDeclaration: string | null;
    photoDeclaration: string | null;
  }[];
  kmContacts: {
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];
  agreementUrl: string;
}
