import { getServiceRequester } from "@/lib/api/service-requester-api";
import { QUERIES } from "@/lib/constants/queries";
import { SelectItem } from "@/lib/types/common-type";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useServiceRequesterDropdown() {
  const { data, isLoading } = useQuery({
    queryFn: getServiceRequester,
    queryKey: [QUERIES.SERVICE_REQUESTER]
  });

  const serviceRequestersDropdownItems: SelectItem[] = useMemo(() => {
    if (isLoading) return [];

    return (
      data?.data.map((item) => ({
        value: item._id,
        label: item.nama
      })) || []
    );
  }, [data, isLoading]);

  return {
    serviceRequestersDropdownItems
  };
}
