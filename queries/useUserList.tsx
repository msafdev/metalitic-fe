import { getUsers } from "@/lib/api/user-api";
import { QUERIES } from "@/lib/constants/queries";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useUserList() {
  const query = useQuery({
    queryFn: getUsers,
    queryKey: [QUERIES.USERS]
  });

  const testerUsers = useMemo(() => {
    if (query.isLoading) return [];

    const users = query.data?.data || [];
    // User penguji adalah user yang bukan manager
    const filteredUsers = users.filter((user) => user.jabatan !== "manager");

    return filteredUsers;
  }, [query.data, query.isLoading]);

  return {
    ...query,
    testerUsers
  };
}
