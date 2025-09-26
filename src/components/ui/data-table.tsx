"use client"

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // ========================
  // Helper para formatear fechas
  // ========================
  const formatDate = (value: string | Date, type: "date" | "datetime") => {
    if (!value) return "";
    const date = new Date(value);
    const pad = (n: number) => n.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    if (type === "date") return `${day}/${month}/${year}`;
    if (type === "datetime") {
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());
      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }
  };

  // ========================
  // Columnas formateo de fechas
  // ========================
  const formatColumns = [
    ...columns.map((col: any) => {
      // Fechas
      if (col.type === "date") return { ...col, cell: (info: any) => formatDate(info.getValue(), "date") };
      if (col.type === "datetime") return { ...col, cell: (info: any) => formatDate(info.getValue(), "datetime") };

      // JSON → mostrar claves activas como badges
      if (col.type === "custom-actions") {
        return {
          ...col,
          cell: (info: any) => {
            const json: Record<string, boolean> = info.getValue() || {};
            if (typeof json !== "object" || Object.keys(json).length === 0) return "-";

            return (
              <div className="flex gap-1 flex-wrap" title={JSON.stringify(json)}>
                {Object.entries(json).map(([key, value]) => (
                  <span
                    key={key}
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      value
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {key}
                  </span>
                ))}
              </div>
            );
          },
        };
      }

      // Boolean → mostrar checkbox read-only
      if (col.type === "boolean" || col.type === "checkbox") {
        return {
          ...col,
          cell: (info: any) => {
            const value = info.getValue();
            if (value === null || value === undefined) return "-";
            return (
              <input
                type="checkbox"
                checked={!!value}
                readOnly
                className="cursor-default"
              />
            );
          },
        };
      }

      return col;
    }),
  ];

  const table = useReactTable({
    data,
    columns: formatColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const filterableColumn = table.getAllColumns().find((col) => col.getCanFilter());

  return (
    <div>
      <div className="flex items-center py-4">
        {filterableColumn && (
          <Input
            placeholder={`Filter by ${filterableColumn.id}...`}
            value={(filterableColumn.getFilterValue() as string) ?? ""}
            onChange={(event) => filterableColumn.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-0 ml-2"> {/* ml-2 para separación */}
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}