export interface FarmersResponse {
  idUser: string;
  inn: string[];
  organizationName: string;
  phoneOrganization: string;
  emailOrganization: string;
  startDateOfCooperation: string;
  dateOfFirstDelivery: string;
  photo: string;
  legalAddress: string;
  workshopAddress: string;
  companyHistory: string;
  kpp: string[];
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
  additionalContacts: [
    {
      name: string;
      email: string;
      phone: string;
      position: string;
    },
  ];
  kmContacts: {
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];
  declarations: [
    {
      nameDeclaration: string;
      dateEndDeclaration: string;
    },
    {
      nameDeclaration: string;
      dateEndDeclaration: string;
    },
    {
      nameDeclaration: string;
      dateEndDeclaration: string;
    },
  ];
}
