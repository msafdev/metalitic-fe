"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [filter, setFilter] = useState("");

  const tableState = useMemo(
    () => ({
      globalFilter: filter,
    }),
    [filter]
  );

  const table = useReactTable({
    data,
    columns,
    state: tableState,
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handlePreviousPage = useCallback(() => {
    table.previousPage();
  }, [table]);

  const handleNextPage = useCallback(() => {
    table.nextPage();
  }, [table]);

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();
  const totalRows = table.getPrePaginationRowModel().rows.length;

  return (
    <div className="space-y-4">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 border-y py-4 gap-3 flex-wrap">
        <Input
          className="max-w-xs"
          placeholder="Cari pengguna"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex gap-3 items-center">
          <Button className="has-[>svg]:pl-2" variant={"outline"} asChild>
            <Link href={"/dashboard/users/create"}>
              <Plus size={12} /> Tambah pengguna
            </Link>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 space-y-4">
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="text-muted-foreground bg-muted">
              {headerGroups.map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="first:border-l-0 not-last:border-l text-xs px-3"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {rows?.length ? (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-xs first:border-l-0 not-last:border-l px-3 has-[>button]:flex has-[>button]:justify-end"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-48  text-center"
                  >
                    Tidak ada hasil.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer: Pagination */}
        <div className="flex items-center gap-4 justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviousPage}
              disabled={!canPreviousPage}
            >
              Sebelumnya
            </Button>
            <span>
              {pageIndex + 1} dari {pageCount}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextPage}
              disabled={!canNextPage}
            >
              Selanjutnya
            </Button>
          </div>
          <div className="text-sm">
            Menampilkan {rows.length} dari {totalRows} pengguna
          </div>
        </div>
      </div>
    </div>
  );
}
