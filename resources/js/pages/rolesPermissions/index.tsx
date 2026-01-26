import { Head } from '@inertiajs/react';
import { ShieldPlus } from 'lucide-react';

import { DataTable } from '@/components/datatables/DataTable';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

import { permissionColumns } from './datatable/permission-columns';
import { rolesColumns } from './datatable/roles-columns';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-10 overflow-x-auto rounded-xl p-4">
                {/* Roles */}
                <div className="min-h-xs relative flex-1 md:min-h-min">
                    <DataTable
                        data={roles.data}
                        columns={rolesColumns}
                        title="Roles"
                        total={roles.total}
                        onCreate={() => {}}
                        currentPage={roles.current_page}
                        lastPage={roles.last_page}
                        perPage={roles.per_page}
                        createButtonIcon={ShieldPlus}
                        filterKey="roles_search"
                        hideFilter
                    />
                </div>

                {/* Permissions */}
                <div className="min-h-xs relative flex-1 md:min-h-min">
                    <DataTable
                        data={permissions.data}
                        columns={permissionColumns}
                        title="Permissions"
                        total={permissions.total}
                        onCreate={() => {}}
                        currentPage={permissions.current_page}
                        lastPage={permissions.last_page}
                        perPage={permissions.per_page}
                        filterKey="permissions_search"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
