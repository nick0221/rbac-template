import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table';
import { TriangleAlert, UserPlus2 } from 'lucide-react';

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

interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData, unknown>[];
    title: string;

    /** Laravel pagination */
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    search?: string;

    onSearch?: (value: string) => void;
    onCreate?: () => void;
}

export function DataTable<TData>({
    data,
    columns,
    title,
    currentPage,
    lastPage,
    perPage,
    total,
    search,
    onCreate,
}: DataTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const hasRows = data.length > 0;

    return (
        <div className="flex flex-col gap-2">
            {/* Header */}
            <TableHeader title={title} search={search} onCreate={onCreate} />

            {/* Empty state */}
            {!hasRows ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border py-10 text-sm">
                    <p className="text-muted-foreground">
                        <TriangleAlert size={30} />{' '}
                    </p>
                    <p className="text-muted-foreground">No records found.</p>
                    {onCreate && (
                        <Button onClick={onCreate} size={'sm'}>
                            <UserPlus2 className="h-4 w-4" /> Register{' '}
                            {title.slice(0, -1)}
                        </Button>
                    )}
                </div>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto rounded-xl border border-border">
                        <Table className="text-sm">
                            <ShadTableHeader>
                                {table.getHeaderGroups().map((group) => (
                                    <TableRow key={group.id}>
                                        {group.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className="px-2 py-1"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
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
                                        className="even:bg-muted/50"
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
                    </div>

                    {/* Laravel Pagination */}
                    <DataTablePagination
                        current_page={currentPage}
                        last_page={lastPage}
                        per_page={perPage}
                        total={total}
                    />
                </>
            )}
        </div>
    );
}
