import { create } from "zustand";
import { parse, isValid, format } from "date-fns";

interface Filters {
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
  additionalContacts: {
    name: string;
    phone: string;
    email: string;
    position: string;
  }[];
  personalization: string;
  companyHistory: string;
}

interface FarmerFiltersState {
  filters: Filters;
  updateFilters: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  getApiPayload: () => Filters;
}

const initialFilters = {
  filters: {
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
    personalization: "",
    companyHistory: "",
  },
};

export const useFarmerProfileStore = create<FarmerFiltersState>((set, get) => ({
  ...initialFilters,
  updateFilters: (key, value) =>
    set((state) => {
      return {
        filters: {
          ...state.filters,
          [key]: value,
        },
      };
    }),

  getApiPayload: () => {
    const { filters } = get();

    const toIso = (val: string) => {
      if (!val) return val;
      const d = parse(val, "dd.MM.yyyy", new Date());
      return isValid(d) ? format(d, "yyyy-MM-dd") : val;
    };

    return {
      ...filters,
      declarations: filters.declarations.map((d) => ({
        ...d,
        dateEndDeclaration: toIso(d.dateEndDeclaration),
      })),
      // Также проверь другие даты, например startDateCooper
      startDateCooper: toIso(filters.startDateCooper),
      dateFirstDelivery: toIso(filters.dateFirstDelivery),
    };
  },
}));
