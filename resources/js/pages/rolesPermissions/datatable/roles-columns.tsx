import { ShieldEllipsis, SquarePen } from 'lucide-react';

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
            <Button size={'xs'} variant={'link'}>
                {row.original.permissions.length} Permission
                {row.original.permissions.length > 1 && 's'}
            </Button>
        ),
    },

    {
        id: 'roleTableActions',
        header: 'Actions',
        size: 80,
        enableSorting: false,
        enableHiding: false,
        cell: () => (
            <div className="flex flex-col items-center gap-4">
                <ButtonGroup>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                                <SquarePen />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                                <ShieldEllipsis />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="wrap-break-word">
                            Assign more permission
                        </TooltipContent>
                    </Tooltip>
                </ButtonGroup>
            </div>
        ),
    },
];
