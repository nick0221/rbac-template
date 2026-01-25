import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

import type { BreadcrumbItem } from '@/types';
import type { RolesPermissionsPageProps } from '@/types/roles-permissions';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Roles & Permissions',
        href: '#',
    },
];

export default function RolesPermissionsPage({
    roles,
    permissions,
}: RolesPermissionsPageProps) {
    console.log(roles, permissions);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Roles & Permissions</h1>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border"></div>
            </div>
        </AppLayout>
    );
}
