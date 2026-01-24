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

import type { ColumnDef, Table as TanStackTable } from '@tanstack/react-table';

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
    // const renderHeader = (cell: CellContext<T, unknown>) => {
    //     const header = cell.column.columnDef.header;
    //     if (typeof header === 'string') return header;
    //     return flexRender(header, cell.getContext());
    // };

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
                    <div className="overflow-x-auto rounded-lg border border-border">
                        <Table className="w-full table-fixed border-separate border-spacing-0 text-sm">
                            <ShadTableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow
                                        key={headerGroup.id}
                                        className="bg-muted"
                                    >
                                        {headerGroup.headers.map(
                                            (header, idx) => {
                                                let classes =
                                                    'px-2 py-1 border-b border-border';
                                                if (idx === 0)
                                                    classes += ' rounded-tl-lg';
                                                if (
                                                    idx ===
                                                    headerGroup.headers.length -
                                                        1
                                                )
                                                    classes += ' rounded-tr-lg';
                                                return (
                                                    <TableHead
                                                        key={header.id}
                                                        className={classes}
                                                    >
                                                        {header.isPlaceholder
                                                            ? null
                                                            : typeof header
                                                                    .column
                                                                    .columnDef
                                                                    .header ===
                                                                'string'
                                                              ? header.column
                                                                    .columnDef
                                                                    .header
                                                              : flexRender(
                                                                    header
                                                                        .column
                                                                        .columnDef
                                                                        .header,
                                                                    header.getContext(),
                                                                )}
                                                    </TableHead>
                                                );
                                            },
                                        )}
                                    </TableRow>
                                ))}
                            </ShadTableHeader>

                            <TableBody>
                                {table
                                    .getRowModel()
                                    .rows.map((row, rowIndex) => (
                                        <TableRow
                                            key={row.id}
                                            className={`even:bg-muted ${rowIndex === table.getRowModel().rows.length - 1 ? '' : ''}`}
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell, cellIndex) => {
                                                    let classes =
                                                        'px-2 py-1 border-b border-border';
                                                    const lastRow =
                                                        rowIndex ===
                                                        table.getRowModel().rows
                                                            .length -
                                                            1;
                                                    const lastCell =
                                                        cellIndex ===
                                                        row.getVisibleCells()
                                                            .length -
                                                            1;
                                                    const firstCell =
                                                        cellIndex === 0;

                                                    if (lastRow && firstCell)
                                                        classes +=
                                                            ' rounded-bl-lg';
                                                    if (lastRow && lastCell)
                                                        classes +=
                                                            ' rounded-br-lg';

                                                    return (
                                                        <TableCell
                                                            key={cell.id}
                                                            className={classes}
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext(),
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>

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
