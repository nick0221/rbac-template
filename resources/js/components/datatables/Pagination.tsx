import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import type { Table as TanStackTable } from '@tanstack/react-table';

interface PaginationProps<TData> {
    table: TanStackTable<TData>;
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
}

export function DataTablePagination<TData>({
    table,
    current_page,
    last_page,
    per_page,
    total,
}: PaginationProps<TData>) {
    const currentPage = current_page ?? 1;
    const perPage = per_page ?? 10;
    const lastPage = last_page ?? 1;
    const totalEntries = total ?? 0;

    const formatCount = (value: number): string => {
        if (value < 1000) return String(value);
        if (value < 1_000_000) {
            const num = value / 1000;
            return `${num % 1 === 0 ? num : num.toFixed(1)}k`;
        }
        const num = value / 1_000_000;
        return `${num % 1 === 0 ? num : num.toFixed(1)}M`;
    };

    return (
        <div className="flex flex-col gap-3 border-t px-2 py-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Rows info */}
            <div className="text-xs text-muted-foreground">
                Showing <strong>{(currentPage - 1) * perPage + 1}</strong> to{' '}
                <strong>{Math.min(currentPage * perPage, totalEntries)}</strong>{' '}
                of <strong>{formatCount(totalEntries)}</strong> records
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                {/* Rows per page */}
                <Select
                    value={String(perPage)}
                    onValueChange={(value) => table.setPageSize(Number(value))}
                >
                    <SelectTrigger className="h-8 w-[100px] text-xs">
                        <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 50].map((size) => (
                            <SelectItem key={size} value={String(size)}>
                                {size} / page
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* First */}
                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => table.setPageIndex(0)}
                    disabled={currentPage === 1}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Previous */}
                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => table.previousPage()}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page info */}
                <span className="text-xs font-medium">
                    Page {currentPage} of {lastPage}
                </span>

                {/* Next */}
                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => table.nextPage()}
                    disabled={currentPage === lastPage}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last */}
                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => table.setPageIndex(lastPage - 1)}
                    disabled={currentPage === lastPage}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
