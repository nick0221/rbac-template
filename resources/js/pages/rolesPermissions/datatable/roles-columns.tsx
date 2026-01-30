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

// import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
// } from '@/components/ui/tooltip';
import type { Role } from '@/types/roles-permissions';
import type { ColumnDef } from '@tanstack/react-table';

export const rolesColumns: ColumnDef<Role, unknown>[] = [
    {
        id: 'index',
        header: '#',
        size: 1,
        minSize: 1,
        cell: ({ row, table }) => {
            const meta = table.options.meta;
            if (!meta) return null;

            return (meta.currentPage - 1) * meta.perPage + row.index + 1 + '.';
        },
    },
    {
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
        accessorKey: 'guard_name',
        header: 'Guard Name',
    },
    {
        id: 'permissions',
        header: 'Permissions',
        cell: ({ row, table }) => {
            const metaShowPermissions = table.options.meta?.onOpenDrawer;

            return (
                <Button
                    variant="link"
                    size="xs"
                    onClick={() => metaShowPermissions?.(row.original)}
                >
                    {row.original.permissions.length} Permission
                    {row.original.permissions.length > 1 && 's'}
                </Button>
            );
        },
    },

    {
        id: 'roleTableActions',
        header: 'Actions',
        size: 80,
        enableSorting: false,
        enableHiding: false,
        cell: ({ row, table }) => {
            const metaEditrole = table.options.meta?.onEdit;
            const metaShowPermissions = table.options.meta?.onOpenDrawer;

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
                                onClick={() => metaEditrole?.(row.original)}
                                className="cursor-pointer"
                            >
                                <SquarePen />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    metaShowPermissions?.(row.original)
                                }
                                className="cursor-pointer"
                            >
                                <ShieldEllipsis />
                                Show Permissions
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                variant="destructive"
                                className="cursor-pointer"
                            >
                                <Trash />
                                Trash
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
