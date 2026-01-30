import { router } from '@inertiajs/react';
import {
    MoreHorizontalIcon,
    SquarePen,
    Trash,
    UserCog2,
    X,
} from 'lucide-react';
import { route } from 'ziggy-js';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

import type { Permission } from '@/types/roles-permissions';
import type { ColumnDef } from '@tanstack/react-table';

export const permissionColumns: ColumnDef<Permission>[] = [
    {
        id: 'index',
        header: '#',
        size: 1,
        minSize: 1,
        cell: ({ row, table }) => {
            const { currentPage, perPage } = table.options.meta!;
            return (currentPage - 1) * perPage + row.index + 1 + '.';
        },
    },
    {
        header: () => <div className="flex justify-start">Name</div>,
        id: 'permissionName',
        cell: ({ row }) => (
            <div className="flex items-center justify-start">
                {row.original.name}
            </div>
        ),
    },
    {
        header: () => <div className="flex justify-start">Page</div>,
        id: 'page',
        cell: ({ row }) => (
            <div className="flex items-center justify-start capitalize">
                {row.original.page?.name || '-'}
            </div>
        ),
    },
    {
        id: 'role',
        header: 'Role type',
        cell: ({ row }) => (
            <div className="flex flex-wrap gap-1">
                {row.original.roles.length === 0 && (
                    <Badge variant="secondary">Not assigned</Badge>
                )}
                {row.original.roles.map((role) => (
                    <Badge
                        key={role.id}
                        variant="outline"
                        className="rounded-full"
                    >
                        {role.display_name}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-xs"
                                    className="p-0 hover:text-red-600"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.put(
                                            route(
                                                'permissions.detachRole',
                                                row.original.id,
                                            ),
                                            {
                                                role_id: role.id,
                                                preserveScroll: true,
                                            },
                                        );
                                    }}
                                >
                                    <X />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Click to detach</TooltipContent>
                        </Tooltip>
                    </Badge>
                ))}
            </div>
        ),
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
        id: 'roletTableActions',
        header: 'Actions',
        cell: ({ row, table }) => {
            const metaEditPermission = table.options.meta?.onEdit;
            const metaPermitToRole = table.options.meta?.onPermit;
            const metaDeletePermission = table.options.meta?.onDelete;

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
                                onClick={() =>
                                    metaEditPermission?.(row.original)
                                }
                                className="cursor-pointer"
                            >
                                <SquarePen />
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => metaPermitToRole?.(row.original)}
                                className="cursor-pointer"
                            >
                                <UserCog2 />
                                Roles
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() =>
                                    metaDeletePermission?.(row.original)
                                }
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
