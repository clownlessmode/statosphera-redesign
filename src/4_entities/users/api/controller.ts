import { useQuery } from "@tanstack/react-query";
import { UsersService } from "./service";

export const useUsersService = () => {
  const getUsers = useQuery({
    queryKey: ["users"],
    queryFn: UsersService.getUsers,
  });

  return {
    users: getUsers.data,
    isUsersLoading: getUsers.isPending,
  };
};
