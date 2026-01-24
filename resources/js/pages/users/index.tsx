import { Head } from '@inertiajs/react';

import { DataTable } from '@/components/datatables/DataTable';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

import { userColumns } from './datatable/user-columns';

import type { BreadcrumbItem } from '@/types';
import type { UsersIndexPageProps } from '@/types/users';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Users',
        href: '#',
    },
];

export default function UsersIndexPage({ users }: UsersIndexPageProps) {
    console.log(users);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTable
                        data={users?.data ?? []}
                        columns={userColumns}
                        title="Users"
                        totalItems={0}
                        perPage={10}
                        onCreate={() => console.log('Create new user')}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
