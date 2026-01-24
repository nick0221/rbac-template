import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    TableHeader as ShadTableHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './Pagination';
import TableHeader from './TableHeader';

import type {
    CellContext,
    ColumnDef,
    Table as TanStackTable,
} from '@tanstack/react-table';

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    title: string;
    totalItems: number;
    perPage: number;
    onCreate?: () => void;
}

export const DataTable = <T,>({
    data,
    columns,
    title,
    totalItems,
    perPage,
    onCreate,
}: DataTableProps<T>) => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    // Filter data by search (all string fields)
    const filteredData = search
        ? data.filter((item) =>
              Object.values(item).some(
                  (val) =>
                      typeof val === 'string' &&
                      val.toLowerCase().includes(search.toLowerCase()),
              ),
          )
        : data;

    const table = useReactTable<T>({
        data: filteredData,
        columns,
        state: {
            pagination: { pageIndex: page - 1, pageSize: perPage },
        },
        onPaginationChange: (updater) => {
            const next =
                typeof updater === 'function'
                    ? updater({ pageIndex: page - 1, pageSize: perPage })
                    : updater;
            setPage(next.pageIndex + 1);
        },
        pageCount: Math.ceil(filteredData.length / perPage),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    // Type-safe render header
    const renderHeader = (cell: CellContext<T, unknown>) => {
        const header = cell.column.columnDef.header;
        if (typeof header === 'string') return header;
        return flexRender(header, cell.getContext());
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Table Header */}
            <TableHeader
                title={title}
                search={search}
                onSearch={setSearch}
                onCreate={onCreate}
            />

            {/* No records UX */}
            {filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-sidebar-border/70 py-10 text-center text-sm dark:border-sidebar-border">
                    <p className="text-sm text-muted-foreground">
                        No records found.
                    </p>
                    {onCreate && (
                        <Button onClick={onCreate} size="sm" variant="default">
                            Create New {title.slice(0, -1)}
                        </Button>
                    )}
                </div>
            ) : (
                <>
                    {/* Compact Table */}
                    <Table className="table-auto rounded-xl border border-sidebar-border/70 text-sm dark:border-sidebar-border">
                        <ShadTableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="px-2 py-1"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : typeof header.column.columnDef
                                                        .header === 'string'
                                                  ? header.column.columnDef
                                                        .header
                                                  : flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </ShadTableHeader>

                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="even:bg-muted"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="px-2 py-1"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <DataTablePagination
                        table={table as TanStackTable<T>}
                        current_page={page}
                        last_page={Math.ceil(filteredData.length / perPage)}
                        per_page={perPage}
                        total={totalItems}
                    />
                </>
            )}
        </div>
    );
};
