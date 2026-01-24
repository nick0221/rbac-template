import type { ColumnDef } from '@tanstack/react-table';

export type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
};

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({ getValue }) =>
            new Date(getValue() as string).toLocaleDateString(),
    },
];
