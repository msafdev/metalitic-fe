import { getUsers } from "@/lib/api/user-api";
import { QUERIES } from "@/lib/constants/queries";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  return useQuery({
    queryKey: [QUERIES.USERS],
    queryFn: getUsers,
  });
}
