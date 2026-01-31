import { ShieldPlus } from 'lucide-react';
import { useState } from 'react';

import { DataTable } from '@/components/datatables/DataTable';
import PermissionDrawer from '@/components/rolesPermissions/permission-drawer';

import { rolesColumns } from '../datatable/roles-columns';
import DialogAddRole from '../dialog/dialog-add-role';
import DialogEditRole from '../dialog/dialog-edit-role';

import type {
    Role,
    RolesPermissionsPageProps,
} from '@/types/roles-permissions';

interface TabsRoleContentProps {
    roles: RolesPermissionsPageProps['roles'];
}

export default function TabContentRole({ roles }: TabsRoleContentProps) {
    const [open, setOpen] = useState(false);

    const [openPermissionDrawer, setOpenPermissionDrawer] = useState(false);
    const [selectedRoleWithPermission, setSelectedRoleWithPermission] =
        useState<Role | null>(null);

    const [editRoleOpen, setEditRoleOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    return (
        <>
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
                defaultHiddenColumns={['created_at', 'guard_name']}
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
        </>
    );
}
