import { getProjects } from "@/lib/api/project-api";
import { QUERIES } from "@/lib/constants/queries";
import { useQuery } from "@tanstack/react-query";

export default function useProject() {
  return useQuery({
    queryKey: [QUERIES.PROJECTS],
    queryFn: getProjects,
  });
}
