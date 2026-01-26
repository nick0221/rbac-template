import { Badge } from '@/components/ui/badge';

import type { ColumnDef } from '@tanstack/react-table';

export type Role = {
    id: number;
    name: string;
};

export type Permission = {
    id: number;
    name: string;
    created_at: string;
    page: {
        name: string;
    };
    roles: Role[];
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
        header: 'Can access role',
        cell: ({ row }) => (
            <div className="flex flex-wrap gap-1">
                {row.original.roles.map((role) => (
                    // <span
                    //     key={role.id}
                    //     className="rounded bg-accent px-2 py-0.5 text-xs text-accent-foreground"
                    // >
                    //     {role.name}
                    // </span>
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
    },
];
