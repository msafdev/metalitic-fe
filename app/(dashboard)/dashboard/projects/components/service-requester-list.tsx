import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getServiceRequester } from "@/lib/api/service-requester-api";
import { QUERIES } from "@/lib/constants/queries";
import useServiceRequesterMutation from "@/mutation/use-service-requester-mutation";
import { useQuery } from "@tanstack/react-query";
import { Search, Trash2, Users, Users2 } from "lucide-react";
import { useState } from "react";

export default function ServiceRequesterList() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryFn: getServiceRequester,
    queryKey: [QUERIES.SERVICE_REQUESTER]
  });

  const { deleteServiceRequesterMutation } = useServiceRequesterMutation();

  const serviceRequesters = data?.data || [];
  const filteredServiceRequesters = serviceRequesters?.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          placeholder="Cari Penerima Jasa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 pr-4 py-3 bg-white border-slate-200"
        />
      </div>

      <div className="bg-white/80 rounded-xl border border-slate-200/50 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-3 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Users className="w-5 h-5 text-slate-600" />
              <span>Daftar Peminta Jasa</span>
            </h3>
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-slate-200 text-slate-700"
            >
              {serviceRequesters?.length || 0} Peminta Jasa
            </Badge>
          </div>
        </div>

        {isLoading ? (
          <div>
            <Skeleton />
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {!filteredServiceRequesters.length ? (
              <div className="text-center py-12 text-muted-foreground/70">
                <Users2 className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-sm font-medium mb-1">
                  Daftar Peminta Jasa tidak ditemukan
                </h3>
                <p className="text-sm">
                  {search
                    ? "Coba ubah kata kunci pencarian"
                    : "Tambah peneima jasa terlebih dahulu"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredServiceRequesters.map((item, index) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between px-6 py-3 hover:bg-slate-50/80 transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="size-8 border-2 border-slate-200">
                        <AvatarFallback className="text-[10px] bg-gradient-to-br from-slate-500 to-slate-600 text-white font-semibold">
                          {item.nama
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold group-hover:text-slate-700 text-sm">
                          {item.nama}
                        </p>
                        <p className="text-xs text-slate-400">
                          Ditambahkan:{" "}
                          {new Date(item.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        deleteServiceRequesterMutation.mutate(item._id)
                      }
                      disabled={deleteServiceRequesterMutation.isPending}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
