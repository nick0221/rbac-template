import {
    MoreHorizontalIcon,
    ShieldEllipsis,
    SquarePen,
    Trash,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Page } from '@/types/roles-permissions';
import type { ColumnDef } from '@tanstack/react-table';

export const pagesColumns: ColumnDef<Page, unknown>[] = [
    {
        id: 'index',
        header: '#',
        size: 1,
        minSize: 1,
        enableHiding: false,
        enableSorting: false,
        cell: ({ row, table }) => {
            const meta = table.options.meta;
            if (!meta) return null;

            return (meta.currentPage - 1) * meta.perPage + row.index + 1 + '.';
        },
    },
    {
        id: 'created_at',
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({ getValue }) =>
            new Date(getValue() as string).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
    },
    {
        header: 'Name',
        id: 'name',
        accessorKey: 'name',
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-start">
                    {row.original.name || '-'}
                </div>
            );
        },
    },
    {
        header: 'Slug',
        id: 'slug',
        accessorKey: 'slug',
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-start">
                    {row.original.slug || '-'}
                </div>
            );
        },
    },
    {
        id: 'pagesPermission',
        accessorKey: 'permissions',
        header: 'Permissions',
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    {row.original.permissions.length}
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        size: 1,
        minSize: 1,
        enableSorting: false,
        enableHiding: false,

        cell: ({ row, table }) => {
            const metaEditPages = table.options.meta?.onEdit;
            const metaDeletePages = table.options.meta?.onDelete;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon-sm"
                            aria-label="More Options"
                        >
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-50">
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => metaEditPages?.(row.original)}
                                className="cursor-pointer"
                            >
                                <SquarePen />
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => metaEditPages?.(row.original)}
                                className="cursor-pointer"
                            >
                                <ShieldEllipsis />
                                Permissions
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() => metaDeletePages?.(row.original)}
                                className="cursor-pointer"
                            >
                                <Trash />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
