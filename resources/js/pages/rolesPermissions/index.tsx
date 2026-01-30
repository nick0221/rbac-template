import { Head, usePage } from '@inertiajs/react';
import { ShieldPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/datatables/DataTable';
import PermissionDrawer from '@/components/rolesPermissions/permission-drawer';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

import { permissionColumns } from './datatable/permission-columns';
import { rolesColumns } from './datatable/roles-columns';
import DialogAddPermission from './dialog/dialog-add-permission';
import DialogAddRole from './dialog/dialog-add-role';
import DialogConfimDelete from './dialog/dialog-confirm-delete';
import DialogEditPermission from './dialog/dialog-edit-permission';
import DialogEditRole from './dialog/dialog-edit-role';
import DialogPermitToRole from './dialog/dialog-permit-to-role';

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
    allRoles,
    pages,
}: RolesPermissionsPageProps) {
    const [open, setOpen] = useState(false);
    const [openCreatePermission, setOpenCreatePermission] = useState(false);

    const [openPermissionDrawer, setOpenPermissionDrawer] = useState(false);
    const [selectedRoleWithPermission, setSelectedRoleWithPermission] =
        useState<Role | null>(null);

    const { flash } = usePage<SharedData>().props;

    const [editRoleOpen, setEditRoleOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const [editPermissionOpen, setEditPermissionOpen] = useState(false);
    const [selectedPermission, setSelectedPermission] =
        useState<Permission | null>(null);

    const [permitAccessToRoleOpen, setPermitAccessToRoleOpen] = useState(false);
    const [selectedAccessToRole, setSelectedAccessToRole] =
        useState<Permission | null>(null);

    const [openConfirmDeleteOpen, setOpenConfirmDeleteOpen] = useState(false);
    const [selectedpermissionDelete, setSelectedpermissionDelete] =
        useState<Permission | null>(null);

    // Show Toast Message
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
    }, [flash]);

    console.log(pages);

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
                            onOpenDrawer: (role: Role) => {
                                setSelectedRoleWithPermission(role);
                                setOpenPermissionDrawer(true);
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

                    {/* PermissionDrawer Tooltip */}
                    <PermissionDrawer
                        open={openPermissionDrawer}
                        setOpen={setOpenPermissionDrawer}
                        roleWithPermissions={selectedRoleWithPermission}
                    />
                </div>

                {/* Permissions */}
                <div className="min-h-xs relative flex-1 md:min-h-min">
                    <DataTable
                        data={permissions.data}
                        columns={permissionColumns}
                        title="Permissions"
                        total={permissions.total}
                        onCreate={() => {
                            setOpenCreatePermission(true);
                        }}
                        meta={{
                            onEdit: (permission: Permission) => {
                                setSelectedPermission(permission);
                                setEditPermissionOpen(true);
                            },
                            onPermit: (permission: Permission) => {
                                setSelectedAccessToRole(permission);
                                setPermitAccessToRoleOpen(true);
                            },
                            onDelete: (permission: Permission) => {
                                setSelectedpermissionDelete(permission);
                                setOpenConfirmDeleteOpen(true);
                            },
                        }}
                        currentPage={permissions.current_page}
                        lastPage={permissions.last_page}
                        perPage={permissions.per_page}
                        filterKey="permissions_search"
                    />

                    {/* Add Permission */}
                    <DialogAddPermission
                        open={openCreatePermission}
                        setOpen={setOpenCreatePermission}
                    />

                    {/* Edit Permission */}
                    {selectedPermission && (
                        <DialogEditPermission
                            open={editPermissionOpen}
                            setOpen={setEditPermissionOpen}
                            permission={selectedPermission}
                        />
                    )}

                    {/* Permit Access To Role */}
                    {selectedAccessToRole && (
                        <DialogPermitToRole
                            open={permitAccessToRoleOpen}
                            setOpen={setPermitAccessToRoleOpen}
                            permission={selectedAccessToRole}
                            roles={allRoles}
                        />
                    )}

                    {/* Delete Confirmation  */}
                    <DialogConfimDelete
                        open={openConfirmDeleteOpen}
                        setOpen={setOpenConfirmDeleteOpen}
                        permission={selectedpermissionDelete}
                    />
                </div>

                {/* Pages */}
                <div className="min-h-xs relative flex-1 md:min-h-min"></div>
            </div>
        </AppLayout>
    );
}
