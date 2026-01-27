import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { InfoIcon } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { route } from 'ziggy-js';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
} from '@/components/ui/combobox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import type { Permission, Role } from '@/types/roles-permissions';

interface DialogPermitToRoleProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    permission: Permission;
    roles: Role[];
}

export default function DialogPermitToRole({
    open,
    setOpen,
    permission,
    roles,
}: DialogPermitToRoleProps) {
    const { data, setData, put, processing, reset } = useForm({
        name: permission.name,
        roles: permission.roles.map((r) => r.id.toString()),
    });

    // Already saved roles
    const assignedRoles = useMemo(
        () =>
            roles.filter((role) =>
                permission.roles.some((assigned) => assigned.id === role.id),
            ),
        [roles, permission.roles],
    );

    // Roles available for combobox selection
    const availableRoles = useMemo(
        () =>
            roles.filter(
                (role) =>
                    !permission.roles.some(
                        (assigned) => assigned.id === role.id,
                    ),
            ),
        [roles, permission.roles],
    );

    useEffect(() => {
        if (open) reset();
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('permissions.assignRoles', permission.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    // const handleDetachRole = (roleId: number) => {
    //     router.put(route('permissions.detachRole', permission.id), {
    //         role_id: roleId,
    //         preserveScroll: true,
    //     });
    // };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Assign Permission to Roles</DialogTitle>
                        <DialogDescription>
                            <span className="flex items-start gap-1 text-xs text-muted-foreground italic">
                                <InfoIcon className="h-4 w-4" />
                                Only roles without this permission can be
                                selected.
                            </span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        {/* Page */}
                        <div className="flex flex-col gap-2">
                            <Label>Page</Label>
                            <Badge variant="secondary" className="w-fit">
                                {permission.page.name}
                            </Badge>
                        </div>

                        {/* Permission */}
                        <div className="flex flex-col gap-2">
                            <Label>Permission</Label>
                            <Badge variant="secondary" className="w-fit">
                                {permission.name}
                            </Badge>
                        </div>

                        {/* Assigned Roles */}
                        <div className="flex flex-col gap-2">
                            <Label>Assigned Roles</Label>
                            <div className="flex flex-wrap gap-2">
                                {assignedRoles.length === 0 &&
                                    data.roles.length === 0 && (
                                        <span className="text-xs text-muted-foreground">
                                            No roles assigned
                                        </span>
                                    )}

                                {/* Saved roles */}
                                {assignedRoles.map((role) => (
                                    <Badge
                                        key={role.id}
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                    >
                                        {role.name}
                                    </Badge>
                                ))}

                                {/* Newly selected roles */}
                                {data.roles
                                    .filter(
                                        (roleId) =>
                                            !assignedRoles.some(
                                                (r) =>
                                                    r.id.toString() === roleId,
                                            ),
                                    )
                                    .map((roleId) => {
                                        const role = roles.find(
                                            (r) => r.id.toString() === roleId,
                                        );
                                        if (!role) return null;

                                        return (
                                            <Badge
                                                key={role.id}
                                                className="flex cursor-default items-center gap-1"
                                            >
                                                {role.name}
                                            </Badge>
                                        );
                                    })}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Click a role to remove this permission
                            </p>
                        </div>

                        {/* Combobox */}
                        <div className="flex flex-col gap-2">
                            <Label>Assign to Roles</Label>
                            <Combobox
                                items={availableRoles.map((r) =>
                                    r.id.toString(),
                                )}
                                multiple
                                value={data.roles}
                                onValueChange={(values) =>
                                    setData('roles', values)
                                }
                                disabled={availableRoles.length === 0}
                            >
                                <ComboboxChips>
                                    <ComboboxValue>
                                        {data.roles.map((roleId) => {
                                            const role = roles.find(
                                                (r) =>
                                                    r.id.toString() === roleId,
                                            );
                                            return (
                                                <ComboboxChip key={roleId}>
                                                    {role?.name}
                                                </ComboboxChip>
                                            );
                                        })}
                                    </ComboboxValue>
                                    <ComboboxChipsInput placeholder="Add role" />
                                </ComboboxChips>

                                <ComboboxContent className="pointer-events-auto z-50">
                                    <ComboboxEmpty>
                                        No roles available
                                    </ComboboxEmpty>
                                    <ComboboxList className="z-[100]">
                                        {(roleId) => {
                                            const role = availableRoles.find(
                                                (r) =>
                                                    r.id.toString() === roleId,
                                            );
                                            if (!role) return null;
                                            return (
                                                <ComboboxItem
                                                    key={role.id}
                                                    value={roleId}
                                                >
                                                    {role.name}
                                                </ComboboxItem>
                                            );
                                        }}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={processing || data.roles.length === 0}
                        >
                            {processing ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
