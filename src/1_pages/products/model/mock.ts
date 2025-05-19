import { useFilters } from "@entities/report/model/api/filters/products/controller";
import {
  AutoManagerFilterResponse,
  DirectionFilterResponse,
  FranchiseFilterResponse,
  GroupEconomistFilterResponse,
  GroupMainFilterResponse,
  NomenklaturaFilterResponse,
  SeasonFilterResponse,
  SubdivisionFilterResponse,
  SubgroupFilterResponse,
  SubSubGroupFilterResponse,
  TeamFilterResponse,
  TypeSenderFilterResponse,
} from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { Pizza, Salad, Utensils } from "lucide-react";
import { useState } from "react";

export const healthy = [
  {
    label: "Не выбрано",
    value: null,
    icon: Utensils,
  },
  {
    label: "ПП",
    value: true,
    icon: Salad,
  },
  {
    label: "Не ПП",
    value: false,
    icon: Pizza,
  },
];

export const useFranchise = (allData: any) => {
  const [franchiseOptions, setFranchiseOptions] = useState<MultiSelectOption[]>(
    []
  );
  const { getFranchise, isFranchiseLoading } = useFilters();

  const handleOpenFranchiseSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getFranchise(allData);
      const apiOptions = response.map((franchise: FranchiseFilterResponse) => ({
        label: franchise.groupsFranchise,
        value: String(franchise.idGroupsFranchise?.[0] || ""),
      }));
      setFranchiseOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке партнёров:", error);
    }
  };

  return { handleOpenFranchiseSelect, franchiseOptions, isFranchiseLoading };
};
export const useSubdivision = (allData: any) => {
  const [subdivisionOptions, setSubdibisionOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getSubdivisions, isSubdivisionsLoading } = useFilters();

  const handleOpenSubdivisionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSubdivisions(allData);
      const apiOptions = response.map(
        (subdivision: SubdivisionFilterResponse) => ({
          label: subdivision.subdivisionProducts,
          value: String(subdivision.idSubdivisionProducts?.[0] || ""),
        })
      );
      setSubdibisionOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке подразделений:", error);
    }
  };

  return {
    handleOpenSubdivisionsSelect,
    subdivisionOptions,
    isSubdivisionsLoading,
  };
};

export const useTeam = (allData: any) => {
  const [teamOptions, setTeamOptions] = useState<MultiSelectOption[]>([]);
  const { getTeam, isTeamLoading } = useFilters();

  const handleOpenTeamsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getTeam(allData);
      const apiOptions = response.map((team: TeamFilterResponse) => ({
        label: team.teamProducts,
        value: String(team.idTeamProducts?.[0] || ""),
      }));
      setTeamOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке команд:", error);
    }
  };

  return {
    handleOpenTeamsSelect,
    teamOptions,
    isTeamLoading,
  };
};

export const useDirection = (allData: any) => {
  const [directionOptions, setDirectionOptions] = useState<MultiSelectOption[]>(
    []
  );
  const { getDirection, isDirectionLoading } = useFilters();

  const handleOpenDirectionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getDirection(allData);
      const apiOptions = response.map((direction: DirectionFilterResponse) => ({
        label: direction.directionProducts,
        value: String(direction.idDirectionProducts?.[0] || ""),
      }));
      setDirectionOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке направлений:", error);
    }
  };

  return {
    handleOpenDirectionsSelect,
    directionOptions,
    isDirectionLoading,
  };
};

export const useEconomist = (allData: any) => {
  const [economistOptions, setEconomistOptions] = useState<MultiSelectOption[]>(
    []
  );
  const { getEconomist, isEconomistLoading } = useFilters();

  const handleOpenEconomistsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getEconomist(allData);
      const apiOptions = response.map(
        (economist: GroupEconomistFilterResponse) => ({
          label: economist.groupsEconomist,
          value: String(economist.idGroupsEconomist?.[0] || ""),
        })
      );
      setEconomistOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке экономистов:", error);
    }
  };

  return {
    handleOpenEconomistsSelect,
    economistOptions,
    isEconomistLoading,
  };
};

export const useSeason = (allData: any) => {
  const [seasonsOptions, setSeasonsOptions] = useState<MultiSelectOption[]>([]);
  const { getSeasons, isSeasonsLoading } = useFilters();

  const handleOpenSeasonsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSeasons(allData);
      const apiOptions = response.map((season: SeasonFilterResponse) => ({
        label: season.seasonalityProducts,
        value: String(season.idSeasonalityProducts?.[0] || ""),
      }));
      setSeasonsOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке сезонов:", error);
    }
  };

  return {
    handleOpenSeasonsSelect,
    seasonsOptions,
    isSeasonsLoading,
  };
};

export const useGroup = (allData: any) => {
  const [groupOptions, setGroupOptions] = useState<MultiSelectOption[]>([]);
  const { getGroups, isGroupsLoading } = useFilters();

  const handleOpenGroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getGroups(allData);
      const apiOptions = response.map((group: GroupMainFilterResponse) => ({
        label: group.groupsMain,
        value: String(group.idGroupsMain?.[0] || ""),
      }));
      setGroupOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке групп:", error);
    }
  };

  return {
    handleOpenGroupsSelect,
    groupOptions,
    isGroupsLoading,
  };
};

export const useSubgroup = (allData: any) => {
  const [subgroupOptions, setSubgroupOptions] = useState<MultiSelectOption[]>(
    []
  );
  const { getSubGroups, isSubGroupsLoading } = useFilters();

  const handleOpenSubgroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSubGroups(allData);
      const apiOptions = response.map((subgroup: SubgroupFilterResponse) => ({
        label: subgroup.subGroups,
        value: String(subgroup.idSubGroups?.[0] || ""),
      }));
      setSubgroupOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке подгрупп:", error);
    }
  };

  return {
    handleOpenSubgroupsSelect,
    subgroupOptions,
    isSubGroupsLoading,
  };
};

export const useSubsubgroup = (allData: any) => {
  const [subsubgroupOptions, setSubsubgroupOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getSubSubGroups, isSubsubgroupsLoading } = useFilters();

  const handleOpenSubsubgroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSubSubGroups(allData);
      const apiOptions = response.map(
        (subsubgroup: SubSubGroupFilterResponse) => ({
          label: subsubgroup.subSubGroups,
          value: String(subsubgroup.idSubSubGroups?.[0] || ""),
        })
      );
      setSubsubgroupOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке подподгрупп:", error);
    }
  };

  return {
    handleOpenSubsubgroupsSelect,
    subsubgroupOptions,
    isSubsubgroupsLoading,
  };
};

export const useAutoManager = (allData: any) => {
  const [autoManagerOptions, setAutoManagerOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getAutoManager, isAutoManagerLoading } = useFilters();

  const handleOpenAutoManagerSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getAutoManager(allData);
      const apiOptions = response.map(
        (autoManager: AutoManagerFilterResponse) => ({
          label: autoManager.managerAuto,
          value: String(autoManager.idManagerAuto?.[0] || ""),
        })
      );
      setAutoManagerOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке автоменеджеров:", error);
    }
  };

  return {
    handleOpenAutoManagerSelect,
    autoManagerOptions,
    isAutoManagerLoading,
  };
};

export const useTypeSender = (allData: any) => {
  const [typeSenderOptions, setTypeSenderOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getTypeSender, isTypeSenderLoading } = useFilters();

  const handleOpenTypeSenderSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getTypeSender(allData);
      const apiOptions = response.map(
        (typeSender: TypeSenderFilterResponse) => ({
          label: typeSender.typeProducts,
          value: String(typeSender.idTypeProducts?.[0] || ""),
        })
      );
      setTypeSenderOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке типов отправителей:", error);
    }
  };

  return {
    handleOpenTypeSenderSelect,
    typeSenderOptions,
    isTypeSenderLoading,
  };
};

export const useNomenklatura = (allData: any) => {
  const [nomenklaturaOptions, setNomenklaturaOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getNomenklatura, isNomenklaturaLoading } = useFilters();

  const handleOpenNomenklaturaSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getNomenklatura(allData);
      const apiOptions = response.map(
        (nomenklatura: NomenklaturaFilterResponse) => ({
          label: nomenklatura.productName
            ? nomenklatura.productName
            : "Название не указано (ID: " + nomenklatura.idProduct + ")",
          value: String(nomenklatura.idProduct?.[0] || ""),
        })
      );
      setNomenklaturaOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке номенклатуры:", error);
    }
  };

  return {
    handleOpenNomenklaturaSelect,
    nomenklaturaOptions,
    isNomenklaturaLoading,
  };
};

export const mock = [
  {
    idProduct: 229132,
    productCode: "УТ-00021186",
    productName: "Бейдж-карман 60х90 мм, горизонтальный, без держателя (СУ)",
    nameImProducts: "-",
    idSubSubGroups: 104,
    subSubGroups: "СоюзУпак",
    idSubGroups: 127,
    subGroups: "Хозтовары",
    idGroupsMain: 48,
    groupsMain: "Хозтовары",
    idGroupsEconomist: 16,
    groupsEconomist: "Сопутка+Км",
    idTypeProducts: 4,
    typeProducts: "Сторонний Поставщик",
    idSeasonalityProducts: 1,
    seasonalityProducts: "Неопределено",
    idSubdivisionProducts: 5,
    subDivisionProducts: "Хозтовары",
    idTeamProducts: 12,
    teamProducts: "Хозтовары",
    idDirectionProducts: 7,
    directionProducts: "Хозтовары",
    ppProducts: true,
    isIm: true,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229205,
    productCode: "УТ-00021254",
    productName: "Мороженное Глазов Джелато бельгийский шоколад, зам, 0,35кг",
    nameImProducts: "-",
    idSubSubGroups: 583,
    subSubGroups: "Мороженое традиционное",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229204,
    productCode: "УТ-00021253",
    productName: "Мороженное Глазов пломбир Джелато Фиордиллате, зам, 0,35кг",
    nameImProducts: "-",
    idSubSubGroups: 583,
    subSubGroups: "Мороженое традиционное",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229203,
    productCode: "УТ-00021252",
    productName: "Сорбет Глазов вишня аморелле, зам, 0,08кг",
    nameImProducts: "-",
    idSubSubGroups: 486,
    subSubGroups: "Сорбет, фруктовый лед",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229202,
    productCode: "УТ-00021251",
    productName:
      "Мороженое Глазов Джелато с бельгийским шоколадом и брауни, зам,  0,08кг",
    nameImProducts: "-",
    idSubSubGroups: 583,
    subSubGroups: "Мороженое традиционное",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229201,
    productCode: "УТ-00021249",
    productName: "Лента Арфпринт атласная розовая, м",
    nameImProducts: "-",
    idSubSubGroups: 419,
    subSubGroups: "Упаковка подарков",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "М",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229200,
    productCode: "УТ-00021244",
    productName: "Кукуруза Сибирские земли початок, 0,3кг (сырье)",
    nameImProducts: "-",
    idSubSubGroups: 597,
    subSubGroups: "Сибирские земли",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 5,
    groupsFranchise: "Гриль",
  },
  {
    idProduct: 229199,
    productCode: "УТ-00021243",
    productName: "Крышка Союзупак прозрачная к стакану 300мл, 90мм",
    nameImProducts: "-",
    idSubSubGroups: 104,
    subSubGroups: "СоюзУпак",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229198,
    productCode: "УТ-00021241",
    productName: "Шашлычки Цуцкова из креветок, зам, 0,17кг",
    nameImProducts: "-",
    idSubSubGroups: 87,
    subSubGroups: "Волков Рыба",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 7,
    managerAuto: "Окруашвили Е.М.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229197,
    productCode: "УТ-00021238",
    productName: "Молоко Согласие 3,5% 2л",
    nameImProducts: "-",
    idSubSubGroups: 611,
    subSubGroups: "Молоко традиционное",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 5,
    managerAuto: "Червова Л.Н.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229196,
    productCode: "УТ-00021237",
    productName: "Молоко Согласие 3,5% 1л",
    nameImProducts: "-",
    idSubSubGroups: 611,
    subSubGroups: "Молоко традиционное",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 5,
    managerAuto: "Червова Л.Н.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229195,
    productCode: "УТ-00021236",
    productName: "Кефир Согласие 2,5% 1кг",
    nameImProducts: "-",
    idSubSubGroups: 680,
    subSubGroups: "Кефир",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 5,
    managerAuto: "Червова Л.Н.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229194,
    productCode: "УТ-00021235",
    productName: "Кефир Согласие 2,5% 0,5кг",
    nameImProducts: "-",
    idSubSubGroups: 680,
    subSubGroups: "Кефир",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 5,
    managerAuto: "Червова Л.Н.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229193,
    productCode: "УТ-00021234",
    productName: "Филе грудки в красном маринаде охл, в/у, вес",
    nameImProducts: "-",
    idSubSubGroups: 352,
    subSubGroups: "100. Шашлык",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "КГ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 1,
    groupsFranchise: "МКП",
  },
  {
    idProduct: 229192,
    productCode: "УТ-00021233",
    productName: "Тонкий стейк в маринаде Гриль ц/б, б/к, охл, в/у, вес",
    nameImProducts: "-",
    idSubSubGroups: 317,
    subSubGroups: "100. Шашлык",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "КГ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 1,
    groupsFranchise: "МКП",
  },
  {
    idProduct: 229191,
    productCode: "УТ-00021230",
    productName: "Лента Арфпринт атласная, м",
    nameImProducts: "-",
    idSubSubGroups: 419,
    subSubGroups: "Упаковка подарков",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "М",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229190,
    productCode: "УТ-00021227",
    productName: "Йогурт Шутова кокосовый, 0,16кг",
    nameImProducts: "-",
    idSubSubGroups: 943,
    subSubGroups: "Йогурты растительные",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 5,
    managerAuto: "Червова Л.Н.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229189,
    productCode: "УТ-00021225",
    productName: "Загуститель КузбассСнаб Медея, вес",
    nameImProducts: "-",
    idSubSubGroups: 273,
    subSubGroups: "КузбассСнаб",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "КГ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 5,
    groupsFranchise: "Гриль",
  },
  {
    idProduct: 229188,
    productCode: "УТ-00021224",
    productName: "Хлеб Галактика с коноплей 0,2кг",
    nameImProducts: "-",
    idSubSubGroups: 640,
    subSubGroups: "Хлеб",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 3,
    managerAuto: "Зарянина А.И.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229187,
    productCode: "УТ-00021220",
    productName: "Соус Меньшиков Тар-Тар, 0,03кг",
    nameImProducts: "-",
    idSubSubGroups: 518,
    subSubGroups: "Соусы",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 7,
    managerAuto: "Окруашвили Е.М.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229186,
    productCode: "УТ-00021219",
    productName: "Соус Меньшиков Сырный, 0,03кг",
    nameImProducts: "-",
    idSubSubGroups: 518,
    subSubGroups: "Соусы",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 7,
    managerAuto: "Окруашвили Е.М.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229185,
    productCode: "УТ-00021218",
    productName: "Соус Меньшиков майонез Прованс, 0,03кг",
    nameImProducts: "-",
    idSubSubGroups: 518,
    subSubGroups: "Соусы",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 7,
    managerAuto: "Окруашвили Е.М.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229184,
    productCode: "УТ-00021217",
    productName: "Соус Меньшиков Бургер, 0,03кг",
    nameImProducts: "-",
    idSubSubGroups: 518,
    subSubGroups: "Соусы",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 7,
    managerAuto: "Окруашвили Е.М.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229183,
    productCode: "УТ-00021216",
    productName: "Сыр Подворье Булет, вес",
    nameImProducts: "-",
    idSubSubGroups: 675,
    subSubGroups: "Сыры мягкие",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "КГ",
    idManagerAuto: 5,
    managerAuto: "Червова Л.Н.",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229182,
    productCode: "УТ-00021214",
    productName: "Капуста брокколи Сибирские земли, зам, 1кг (сырье)",
    nameImProducts: "-",
    idSubSubGroups: 597,
    subSubGroups: "Сибирские земли",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 5,
    groupsFranchise: "Гриль",
  },
  {
    idProduct: 229181,
    productCode: "УТ-00021213",
    productName: "Морковь Сибирские земли мини, зам, вес (сырье)",
    nameImProducts: "-",
    idSubSubGroups: 597,
    subSubGroups: "Сибирские земли",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "КГ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 5,
    groupsFranchise: "Гриль",
  },
  {
    idProduct: 229180,
    productCode: "УТ-00021212",
    productName: "Капуста цветная  Сибирские земли, зам, вес (сырье)",
    nameImProducts: "-",
    idSubSubGroups: 597,
    subSubGroups: "Сибирские земли",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "КГ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 5,
    groupsFranchise: "Гриль",
  },
  {
    idProduct: 229179,
    productCode: "УТ-00021211",
    productName: "Капуста брюссельская Сибирские земли, зам, вес (сырье)",
    nameImProducts: "-",
    idSubSubGroups: 597,
    subSubGroups: "Сибирские земли",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "КГ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 5,
    groupsFranchise: "Гриль",
  },
  {
    idProduct: 229178,
    productCode: "УТ-00021210",
    productName: "Вишня Сибирские земли без косточки, зам, вес (сырье)",
    nameImProducts: "-",
    idSubSubGroups: 597,
    subSubGroups: "Сибирские земли",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "КГ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 5,
    groupsFranchise: "Гриль",
  },
  {
    idProduct: 229175,
    productCode: "К000009288 ",
    productName: "Термометр электронный с выносным щупом",
    nameImProducts: "-",
    idSubSubGroups: 53,
    subSubGroups: "МБП",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229174,
    productCode: "К0000061861",
    productName: null,
    nameImProducts: "-",
    idSubSubGroups: 159,
    subSubGroups: "АРХИВ",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229173,
    productCode: "К0000061066",
    productName: null,
    nameImProducts: "-",
    idSubSubGroups: 159,
    subSubGroups: "АРХИВ",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229172,
    productCode: "К0000059611",
    productName: null,
    nameImProducts: "-",
    idSubSubGroups: 18,
    subSubGroups: "УТ-00013132",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229171,
    productCode: "К0000048844",
    productName: null,
    nameImProducts: "-",
    idSubSubGroups: 159,
    subSubGroups: "АРХИВ",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229170,
    productCode: "К0000026274",
    productName: null,
    nameImProducts: "-",
    idSubSubGroups: 159,
    subSubGroups: "АРХИВ",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 3,
    groupsFranchise: "Сопутка+КM",
  },
  {
    idProduct: 229169,
    productCode: "К000009288",
    productName: null,
    nameImProducts: "-",
    idSubSubGroups: 0,
    subSubGroups: "-",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "-",
    idManagerAuto: 0,
    managerAuto: "-",
    idGroupsFranchise: 0,
    groupsFranchise: "-",
  },
  {
    idProduct: 229168,
    productCode: "УТ-00021228",
    productName: "Блины с творогом и малиной, 0,196кг",
    nameImProducts: "-",
    idSubSubGroups: 503,
    subSubGroups: "191.03 Блины сладкие",
    idSubGroups: 0,
    subGroups: "-",
    idGroupsMain: 0,
    groupsMain: "-",
    idGroupsEconomist: 0,
    groupsEconomist: "-",
    idTypeProducts: 0,
    typeProducts: "-",
    idSeasonalityProducts: 0,
    seasonalityProducts: "-",
    idSubdivisionProducts: 0,
    subDivisionProducts: "-",
    idTeamProducts: 0,
    teamProducts: "-",
    idDirectionProducts: 0,
    directionProducts: "-",
    ppProducts: null,
    isIm: null,
    ed: "ШТ",
    idManagerAuto: 1,
    managerAuto: "-",
    idGroupsFranchise: 6,
    groupsFranchise: "Кулинарная Продукция",
  },
];
