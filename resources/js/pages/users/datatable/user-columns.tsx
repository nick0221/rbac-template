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
        id: 'userImage',
        header: 'Image',
        cell: ({ row }) => (
            <div className="flex max-w-sm items-center">
                <Avatar>
                    <AvatarImage
                        src="/"
                        alt={row.original.name}
                        className="h-8 w-8 rounded-full"
                    />
                    <AvatarFallback className="h-8 w-8 rounded-full">
                        {row.original.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
        ),
    },
    {
        id: 'userDetails',
        header: 'Name',
        cell: ({ row }) => (
            <div>
                <div className="font-medium">{row.original.name}</div>
                <div className="text-sm text-gray-500">
                    {row.original.email}
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
