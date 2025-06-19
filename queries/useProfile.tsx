import { getProfile } from "@/api/auth-api";
import { QUERIES } from "@/lib/constants/queries";
import { useQuery } from "@tanstack/react-query";

export default function useProfile() {
  const queryResponse = useQuery({
    queryKey: [QUERIES.PROFILE],
    queryFn: getProfile,
  });

  return queryResponse;
}
