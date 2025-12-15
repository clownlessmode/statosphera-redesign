import { create } from "zustand";
import formatDateIso from "@shared/lib/format-date-iso";

interface Data {
  photo: FileList;
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
  declarations: {
    nameDeclaration: string;
    dateEndDeclaration: string;
  }[];
  startDateOfCooperation: string;
  dateOfFirstDelivery: string;
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
    phone: string;
    email: string;
    position: string;
  }[];
  companyHistory: string;
}

interface FarmerFiltersState {
  data: Data;
  updateFilters: <K extends keyof Data>(key: K, value: Data[K]) => void;
  getApiPayload: () => Data;
}

const initialFilters = {
  data: {
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
    startDateOfCooperation: "",
    dateOfFirstDelivery: "",
    chiefAccountant: {
      name: "",
      phone: "",
      email: "",
      position: "Главный бухгалтер" as const,
    },
    responsiblePerson: {
      name: "",
      phone: "",
      email: "",
      position: "Ответственное лицо" as const,
    },
    mainContact: {
      name: "",
      phone: "",
      email: "",
      position: "",
    },
    additionalContacts: [],
    companyHistory: "",
  },
};

export const useFarmerProfileStore = create<FarmerFiltersState>((set, get) => ({
  ...initialFilters,
  updateFilters: (key, value) =>
    set((state) => {
      return {
        data: {
          ...state.data,
          [key]: value,
        },
      };
    }),

  getApiPayload: () => {
    const { data } = get();

    return {
      ...data,
      declarations: data.declarations.map((d) => ({
        ...d,
        dateEndDeclaration: formatDateIso(d.dateEndDeclaration),
      })),
      startDateOfCooperation: formatDateIso(data.startDateOfCooperation),
      dateOfFirstDelivery: formatDateIso(data.dateOfFirstDelivery),
    };
  },
}));

interface Contacts {
  contacts: {
    name: string;
    phone: string;
    email: string;
    position: string;
  }[];
}

interface ContactsState {
  contacts: Contacts["contacts"];
  updateContacts: <K extends keyof Contacts>(
    key: K,
    value: Contacts[K],
  ) => void;
  getApiPayload: () => Contacts;
}

const initialContacts = {
  contacts: [],
};

export const useContactsStore = create<ContactsState>((set, get) => ({
  ...initialContacts,
  updateContacts: (_key, value) =>
    set(() => {
      return {
        contacts: value,
      };
    }),

  getApiPayload: () => {
    const { contacts } = get();

    return { contacts };
  },
}));
