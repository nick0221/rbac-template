import { Head, usePage } from '@inertiajs/react';
import { ShieldPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/datatables/DataTable';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

import { permissionColumns } from './datatable/permission-columns';
import { rolesColumns } from './datatable/roles-columns';
import DialogAddRole from './dialog/dialog-add-role';
import DialogEditPermission from './dialog/dialog-edit-permission';
import DialogEditRole from './dialog/dialog-edit-role';

import type { BreadcrumbItem, SharedData } from '@/types';
import type {
    Permission,
    Role,
    RolesPermissionsPageProps,
} from '@/types/roles-permissions';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Roles, Permissions & Pages',
        href: '#',
    },
];

export default function RolesPermissionsPage({
    roles,
    permissions,
}: RolesPermissionsPageProps) {
    const [open, setOpen] = useState(false);
    const { flash } = usePage<SharedData>().props;

    const [editRoleOpen, setEditRoleOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const [editPermissionOpen, setEditPermissionOpen] = useState(false);
    const [selectedPermission, setSelectedPermission] =
        useState<Permission | null>(null);

    // Show Toast Message
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles, Permissions & Pages" />
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
                        meta={{
                            onEdit: (role: Role) => {
                                setSelectedRole(role);
                                setEditRoleOpen(true);
                            },
                        }}
                        currentPage={roles.current_page}
                        lastPage={roles.last_page}
                        perPage={roles.per_page}
                        createButtonIcon={ShieldPlus}
                        filterKey="roles_search"
                        hideFilter
                    />

                    {/* Add Role */}
                    <DialogAddRole open={open} setOpen={setOpen} />

                    {/* Edit Role */}
                    {selectedRole && (
                        <DialogEditRole
                            open={editRoleOpen}
                            setOpen={setEditRoleOpen}
                            role={selectedRole}
                        />
                    )}
                </div>

                {/* Permissions */}
                <div className="min-h-xs relative flex-1 md:min-h-min">
                    <DataTable
                        data={permissions.data}
                        columns={permissionColumns}
                        title="Permissions"
                        total={permissions.total}
                        onCreate={() => {}}
                        meta={{
                            onEdit: (permission: Permission) => {
                                setSelectedPermission(permission);
                                setEditPermissionOpen(true);
                            },
                        }}
                        currentPage={permissions.current_page}
                        lastPage={permissions.last_page}
                        perPage={permissions.per_page}
                        filterKey="permissions_search"
                    />

                    {/* Edit Permission */}
                    {selectedPermission && (
                        <DialogEditPermission
                            open={editPermissionOpen}
                            setOpen={setEditPermissionOpen}
                            permission={selectedPermission}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
