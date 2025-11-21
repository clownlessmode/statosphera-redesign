export interface RequestDto {
  idUser: number;
  organizationName: string;
  managerName: string;
  phoneOrganization: string;
  emailOrganization: string;
  inn: string[];
  kpp: string[] | [];
  nds: string;
  personalization: string;
  bankDetails: string;
  companyHistory: string;
  legalAddress: string;
  postalAddress: string;
  workshopAddress: string;
  ogrn: string;
  okpo: string;
  okved: string;
  declarations:
    | {
        nameDeclaration: string;
        dateEndDeclaration: string;
      }[]
    | [];
  startDateCooper: string;
  dateFirstDelivery: string;
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
  additionalContacts:
    | {
        name: string;
        phone: string;
        email: string;
        position: string;
      }[]
    | [];
}

export interface RequestDtoPhoto {
  photo: File;
}

export interface ProfileResponse {
  organizationName: string;
  phoneOrganization: string;
  emailOrganization: string;
  startDateOfCooperation: string;
  dateOfFirstDelivery: string;
  photoFarmer: string;
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
  additionalContacts:
    | [
        {
          name: string;
          email: string;
          phone: string;
          position: string;
        },
      ]
    | [];
  declarations:
    | {
        nameDeclaration: string;
        dateEndDeclaration: string;
      }[]
    | [];
}
