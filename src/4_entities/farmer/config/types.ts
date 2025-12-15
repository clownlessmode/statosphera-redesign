export interface RequestDto {
  idUser: number;
  organizationName: string;
  managerName: string;
  phoneOrganization: string;
  emailOrganization: string;
  inn: string[];
  kpp: string[] | [];
  nds: string;
  bankDetails: string;
  companyHistory: string;
  legalAddress: string;
  postalAddress: string;
  workshopAddress: string;
  ogrn: string;
  okpo: string;
  okved: string;
  declarations: {
    idDeclarations: number;
    nameDeclaration: string;
    dateEndDeclaration: string;
    photoDeclaration?: string;
  }[];
  startDateOfCooperation: string | null;
  dateOfFirstDelivery: string | null;
  chiefAccountant: {
    name: string;
    phone: string;
    email: string;
    position: "Главный бухгалтер";
  };
  responsiblePerson: {
    name: string;
    phone: string;
    email: string;
    position: "Ответственное лицо";
  };
  mainContact: {
    name: string;
    phone: string;
    email: string;
    position: string;
  };
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
  startDateOfCooperation: string;
  dateOfFirstDelivery: string;
  photo: string;
  legalAddress: string;
  workshopAddress: string;
  companyHistory: string;
  inn: string[];
  kpp: string[] | [];
  nds: string;
  bankDetails: string;
  postalAddress: string;
  ogrn: string;
  okpo: string;
  okved: string;
  managerName: string;
  chiefAccountant: {
    name: string;
    email: string;
    phone: string;
    position: string;
  };
  responsiblePerson: {
    name: string;
    email: string;
    phone: string;
    position: string;
  };
  mainContact: {
    name: string;
    email: string;
    phone: string;
    position: string;
  };
  additionalContacts: {
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
  kmContacts: {
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];
}
