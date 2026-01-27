import { SquarePen } from 'lucide-react';

import PermissionDrawer from '@/components/rolesPermissions/permission-drawer';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

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
        cell: ({ row }) => (
            <div className="flex items-center justify-start capitalize">
                {row.original.name}
            </div>
        ),
    },
    {
        accessorKey: 'guard_name',
        header: 'Guard Name',
    },
    {
        id: 'permissions',
        header: 'Permissions',
        cell: ({ row }) => (
            <PermissionDrawer
                roleId={row.original.id}
                roleName={row.original.name}
                permissions={row.original.permissions}
                isButton={false} // renders as link style inside cell
            />
        ),
    },

    {
        id: 'roleTableActions',
        header: 'Actions',
        size: 80,
        enableSorting: false,
        enableHiding: false,
        cell: ({ row, table }) => {
            const metaEditrole = table.options.meta?.onEdit;

            return (
                <div className="flex flex-col items-center gap-4">
                    <ButtonGroup>
                        {/* Edit Button Tooltip */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => metaEditrole?.(row.original)}
                                >
                                    <SquarePen />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                        </Tooltip>

                        {/* PermissionDrawer Tooltip */}
                        <PermissionDrawer
                            roleId={row.original.id}
                            roleName={row.original.name}
                            permissions={row.original.permissions}
                            isButton={true} // renders icon button
                        />
                    </ButtonGroup>
                </div>
            );
        },
    },
];
