import { Trash2, UserRoundPen } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

import type { User } from '@/types/users';
import type { ColumnDef, CustomColumnMeta } from '@tanstack/react-table';

export const userColumns: ColumnDef<User>[] = [
    {
        id: 'index',
        enableHiding: false,
        header: '#',
        size: 1,
        minSize: 1,
        cell: ({ row, table }) => {
            const { currentPage, perPage } = table.options.meta!;
            return (currentPage - 1) * perPage + row.index + 1 + '.';
        },
    },
    {
        id: 'userDetails',
        meta: { label: 'Name & Email' } as CustomColumnMeta,
        header: 'Name',
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src="/" alt={row.original.name} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 font-extrabold text-accent-foreground dark:bg-neutral-700">
                        {row.original.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">
                        {row.original.name.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                        {row.original.email}
                    </span>
                </div>
            </div>
        ),
    },
    {
        id: 'roleName',
        meta: { label: 'Role' } as CustomColumnMeta,
        header: 'Role',
        cell: ({ row }) => {
            const role = row.original.roles[0];

            return (
                <div className="flex items-start gap-2">
                    <Badge variant={'secondary'}>{role?.display_name}</Badge>
                </div>
            );
        },
    },

    {
        id: 'userTableActions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row, table }) => {
            const metaEditUser = table.options.meta?.onEdit;
            const metaDeleteUser = table.options.meta?.onDelete;

            return (
                <div className="flex items-center-safe justify-center gap-3">
                    <ButtonGroup>
                        <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={() => {
                                metaEditUser?.(row.original);
                            }}
                        >
                            <UserRoundPen />
                        </Button>
                        <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={() => {
                                metaDeleteUser?.(row.original);
                            }}
                        >
                            <Trash2 className="h-4 w-4 text-red-500 dark:text-red-800" />
                        </Button>
                    </ButtonGroup>
                </div>
            );
        },
    },
];
