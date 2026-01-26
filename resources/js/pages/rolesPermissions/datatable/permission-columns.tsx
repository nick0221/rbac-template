import { Key, SquarePen, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
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
        header: () => <div className="flex justify-start">Permission name</div>,
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
                {row.original.page.name}
            </div>
        ),
    },
    {
        id: 'role',
        header: 'Role type',
        cell: ({ row }) => (
            <div className="flex flex-wrap gap-1">
                {row.original.roles.map((role) => (
                    <Badge variant={'secondary'} key={role.id}>
                        {role.name}
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
                                <Key />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Permit access to roles</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Trash2 className="dark:text-red-500" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">Delete</TooltipContent>
                    </Tooltip>
                </ButtonGroup>
            </div>
        ),
    },
];
