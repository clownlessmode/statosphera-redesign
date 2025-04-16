import { useFilters } from "@entities/report/model/api/filters/products/controller";
import {
  DirectionFilterResponse,
  FranchiseFilterResponse,
  GroupEconomistFilterResponse,
  GroupMainFilterResponse,
  SeasonFilterResponse,
  SubdivisionFilterResponse,
  SubgroupFilterResponse,
  SubSubGroupFilterResponse,
  TeamFilterResponse,
} from "@entities/report/model/api/filters/products/service";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { Pizza, Salad, Utensils } from "lucide-react";
import { useState } from "react";

export const healthy = [
  {
    label: "Все",
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
          label: subdivision.groupsFranchise,
          value: String(subdivision.idGroupsFranchise?.[0] || ""),
        })
      );
      setSubdibisionOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке партнёров:", error);
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
        value: String(subgroup.subGroups?.[0] || ""),
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
