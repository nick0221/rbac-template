import type { ColumnDef } from '@tanstack/react-table';

export type Permission = {
    id: number;
    name: string;
    created_at: string;
};

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
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
            <div className="flex items-center justify-start capitalize">
                {row.original.name}
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
    },
];
