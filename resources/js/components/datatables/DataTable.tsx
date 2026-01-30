/* eslint-disable react-hooks/incompatible-library */
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table';
import { Plus, TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    TableHeader as ShadTableHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/components/ui/table';

import { Skeleton } from '../ui/skeleton';

import { DataTablePagination } from './Pagination';
import TableHeader from './TableHeader';

import type { LucideIcon } from 'lucide-react';

interface DataTableProps<TData, TValue = unknown> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    title: string;

    /** Laravel pagination */
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    search?: string;

    // Table Header actions
    // onSearch?: (value: string) => void;
    onCreate?: () => void;
    hideFilter?: boolean;
    createButtonLabel?: string | null;
    createButtonIcon?: LucideIcon | null;
    filterKey?: string;

    loading?: boolean;
    meta?: {
        canEdit?: boolean;
        canDelete?: boolean;
        onEdit?: (role: TData) => void;
        onDelete?: (role: TData) => void;
        onPermit?: (role: TData) => void;
        onOpenDrawer?: (role: TData) => void;
    };
}

export function DataTable<TData, TValue = unknown>({
    data,
    columns,
    title,
    currentPage,
    lastPage,
    perPage,
    total,
    meta,
    onCreate,
    hideFilter,
    createButtonLabel = null,
    createButtonIcon,
    filterKey,
}: DataTableProps<TData, TValue>) {
    const Icon = createButtonIcon;

    useEffect(() => {
        setLoading(false);
    }, [data]);

    const table = useReactTable({
        data,
        columns,
        meta: {
            currentPage,
            perPage,
            ...meta,
        },
        getCoreRowModel: getCoreRowModel(),
    });
    const [loading, setLoading] = useState(true);

    const hasRows = data.length > 0;

    return (
        <div className="flex flex-col gap-2">
            {/* Header */}
            <TableHeader
                createButtonIcon={createButtonIcon}
                createButtonLabel={createButtonLabel}
                title={title}
                hideFilter={hideFilter}
                filterKey={filterKey}
                onCreate={onCreate}
            />

            {/* Empty state */}
            {!hasRows ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border py-10 text-sm">
                    <p className="text-muted-foreground">
                        <TriangleAlert size={30} />{' '}
                    </p>
                    <p className="text-muted-foreground">No records found.</p>
                    {onCreate && (
                        <Button onClick={onCreate} size={'sm'}>
                            {(Icon && <Icon />) || <Plus />}
                            {createButtonLabel ||
                                'Create new ' + title.toLowerCase()}
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
                                                className={`bg-accent px-2 py-1 text-center whitespace-nowrap ${
                                                    header.column.id === 'index'
                                                        ? 'w-8'
                                                        : ''
                                                }`}
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
                                {loading
                                    ? Array.from({ length: perPage }).map(
                                          (_, rowIdx) => (
                                              <TableRow key={rowIdx}>
                                                  {columns.map((_, colIdx) => (
                                                      <TableCell
                                                          key={colIdx}
                                                          className="px-2 py-1"
                                                      >
                                                          <Skeleton
                                                              className="h-4 w-full animate-pulse"
                                                              style={{
                                                                  animationDelay: `${colIdx * 300}ms`,
                                                              }}
                                                          />
                                                      </TableCell>
                                                  ))}
                                              </TableRow>
                                          ),
                                      )
                                    : table.getRowModel().rows.map((row) => (
                                          <TableRow
                                              key={row.id}
                                              className="even:bg-muted/50"
                                          >
                                              {row
                                                  .getVisibleCells()
                                                  .map((cell) => (
                                                      <TableCell
                                                          key={cell.id}
                                                          className={`px-2 py-1 text-center whitespace-nowrap ${
                                                              cell.column.id ===
                                                              'index'
                                                                  ? 'w-8'
                                                                  : ''
                                                          }`}
                                                      >
                                                          {flexRender(
                                                              cell.column
                                                                  .columnDef
                                                                  .cell,
                                                              cell.getContext(),
                                                          )}
                                                      </TableCell>
                                                  ))}
                                          </TableRow>
                                      ))}
                            </TableBody>
                            {/* <TableBody>
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
                            </TableBody> */}
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
