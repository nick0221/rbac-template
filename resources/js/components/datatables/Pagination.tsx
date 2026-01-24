import { router } from '@inertiajs/react';
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

interface PaginationProps {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    baseUrl?: string;
}

export function DataTablePagination({
    current_page,
    last_page,
    per_page,
    total,
    baseUrl = window.location.pathname,
}: PaginationProps) {
    const from = (current_page - 1) * per_page + 1;
    const to = Math.min(current_page * per_page, total);

    const goToPage = (page: number) => {
        router.get(
            baseUrl,
            { page, per_page },
            { preserveScroll: true, preserveState: true },
        );
    };

    const changePerPage = (size: number) => {
        router.get(
            baseUrl,
            { page: 1, per_page: size },
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <div className="flex flex-col gap-3 px-2 py-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Info */}
            <div className="text-xs text-muted-foreground">
                Showing <strong>{from}</strong> to <strong>{to}</strong> of{' '}
                <strong>{total}</strong> records
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                {/* Per page */}
                <Select
                    value={String(per_page)}
                    onValueChange={(v) => changePerPage(Number(v))}
                >
                    <SelectTrigger className="h-8 w-[100px] text-xs">
                        <SelectValue />
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
                    onClick={() => goToPage(1)}
                    disabled={current_page === 1}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Prev */}
                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => goToPage(current_page - 1)}
                    disabled={current_page === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Info */}
                <span className="text-xs font-medium">
                    Page {current_page} of {last_page}
                </span>

                {/* Next */}
                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => goToPage(current_page + 1)}
                    disabled={current_page === last_page}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last */}
                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => goToPage(last_page)}
                    disabled={current_page === last_page}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
