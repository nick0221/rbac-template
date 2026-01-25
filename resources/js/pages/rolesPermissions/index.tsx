import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

import type { BreadcrumbItem } from '@/types';

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
export default function RolesPermissionsPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Roles & Permissions</h1>
            </div>
        </AppLayout>
    );
}
