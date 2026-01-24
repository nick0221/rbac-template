import { Link } from '@inertiajs/react';
import { Trash2, UserRoundPen } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import type { ColumnDef } from '@tanstack/react-table';

export type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
};

export const userColumns: ColumnDef<User>[] = [
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
        id: 'userDetails',
        header: 'Name',
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src="/" alt={row.original.name} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {row.original.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">
                        {row.original.name}
                    </span>
                    <span className="text-xs text-gray-500">
                        {row.original.email}
                    </span>
                </div>
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
        id: 'userTableActions',
        header: 'Actions',
        cell: ({ row }) => (
            <div className="flex items-center-safe justify-center gap-3">
                <Link aria-label={`Edit action ${row.original.name}`}>
                    <UserRoundPen className="h-5 w-5" />
                </Link>
                <Link aria-label={`Delete action ${row.original.name}`}>
                    <Trash2 className="h-5 w-5 text-red-500 dark:text-red-800" />
                </Link>
            </div>
        ),
    },
];
