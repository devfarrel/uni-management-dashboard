import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
    type ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey?: string
    searchPlaceholder?: string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchPlaceholder = "Search...",
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        initialState: {
            pagination: { pageSize: 5 },
        },
    })

    const currentPage = table.getState().pagination.pageIndex + 1
    const totalPages = table.getPageCount()

    return (
        <div className="space-y-4">
            <div className="flex items-center py-4">
                {/* Search */}
                {searchKey && (
                    <Input
                        placeholder={searchPlaceholder}
                        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                        onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
                        className="max-w-sm"
                    />
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                        Columns
                        <ChevronDown className="ml-auto h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                        .getAllColumns()
                        .filter(
                            (column) => column.getCanHide()
                        )
                        .map((column) => {
                            return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
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
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} total row(s)
                </span>

                {totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => table.previousPage()}
                                    className={!table.getCanPreviousPage()
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => {
                                const page = i + 1
                                const showPage =
                                    page === 1 ||
                                    page === totalPages ||
                                    Math.abs(page - currentPage) <= 1

                                if (!showPage) {
                                    if (page === 2 || page === totalPages - 1) {
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )
                                    }

                                    return null
                                }

                                return (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => table.setPageIndex(page - 1)}
                                            isActive={table.getState().pagination.pageIndex === page - 1}
                                            className="cursor-pointer"
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => table.nextPage()}
                                    className={!table.getCanNextPage()
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    )
}