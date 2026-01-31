// ColumnVisibility.tsx
import { SlidersHorizontalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Table } from '@tanstack/react-table';

interface ColumnVisibilityProps<TData> {
    table: Table<TData>;
}

export function ColumnVisibility<TData>({
    table,
}: ColumnVisibilityProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <SlidersHorizontalIcon className="mr-2 h-4 w-4" /> Columns
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
                {table
                    .getAllLeafColumns()
                    .filter((c) => c.getCanHide())
                    .map((column) => (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            checked={column.getIsVisible()}
                            onCheckedChange={(checked) =>
                                table.setColumnVisibility((prev) => ({
                                    ...prev,
                                    [column.id]: checked,
                                }))
                            }
                        >
                            {column.id}
                        </DropdownMenuCheckboxItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
