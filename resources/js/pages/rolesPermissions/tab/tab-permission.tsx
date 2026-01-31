import { useState } from 'react';

import { DataTable } from '@/components/datatables/DataTable';

import { permissionColumns } from '../datatable/permission-columns';
import DialogAddPermission from '../dialog/dialog-add-permission';
import DialogConfimDelete from '../dialog/dialog-confirm-delete';
import DialogEditPermission from '../dialog/dialog-edit-permission';
import DialogPermitToRole from '../dialog/dialog-permit-to-role';

import type {
    Permission,
    RolesPermissionsPageProps,
} from '@/types/roles-permissions';

interface TabContentPermissionProps {
    permissions: RolesPermissionsPageProps['permissions'];
    allRoles: RolesPermissionsPageProps['allRoles'];
}

export default function TabContentPermission({
    permissions,
    allRoles,
}: TabContentPermissionProps) {
    const [openCreatePermission, setOpenCreatePermission] = useState(false);

    // Permissions
    const [editPermissionOpen, setEditPermissionOpen] = useState(false);
    const [selectedPermission, setSelectedPermission] =
        useState<Permission | null>(null);

    const [permitAccessToRoleOpen, setPermitAccessToRoleOpen] = useState(false);
    const [selectedAccessToRole, setSelectedAccessToRole] =
        useState<Permission | null>(null);

    const [openConfirmDeleteOpen, setOpenConfirmDeleteOpen] = useState(false);
    const [selectedpermissionDelete, setSelectedpermissionDelete] =
        useState<Permission | null>(null);

    return (
        <>
            {/* Permissions */}
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
                defaultHiddenColumns={['created_at']}
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
        </>
    );
}
