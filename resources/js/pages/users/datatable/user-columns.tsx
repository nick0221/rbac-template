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
];
