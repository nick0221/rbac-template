import { Head, usePage } from '@inertiajs/react';
import { ShieldPlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/datatables/DataTable';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

import { permissionColumns } from './datatable/permission-columns';
import { rolesColumns } from './datatable/roles-columns';
import DialogAddRole from './dialog/dialog-add-role';

import type { BreadcrumbItem, SharedData } from '@/types';
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
    const [open, setOpen] = useState(false);
    const { flash } = usePage<SharedData>().props;
    const hasShownToast = useRef(false);

    // Show Toast Message
    useEffect(() => {
        if (!hasShownToast.current && flash) {
            if (flash.success) toast.success(flash.success);
            if (flash.error) toast.error(flash.error);

            hasShownToast.current = true;
        }
    }, [flash]);

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
                        onCreate={() => {
                            setOpen(true);
                        }}
                        currentPage={roles.current_page}
                        lastPage={roles.last_page}
                        perPage={roles.per_page}
                        createButtonIcon={ShieldPlus}
                        filterKey="roles_search"
                        hideFilter
                    />
                    <DialogAddRole open={open} setOpen={setOpen} />
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
