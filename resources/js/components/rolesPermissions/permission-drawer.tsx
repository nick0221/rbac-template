import { Button } from '../ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../ui/drawer';

import CollapsiblePermissions from './collapsible-card';

import type { Role } from '@/types/roles-permissions';

interface PermissionsDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    roleWithPermissions: Role | null;
}

export default function PermissionDrawer({
    open,
    setOpen,
    roleWithPermissions,
}: PermissionsDrawerProps) {
    return (
        <Drawer direction="right" open={open} onOpenChange={setOpen}>
            {/* <DrawerTrigger asChild>
                {isButton ? (
                    <Button variant="outline" size="sm">
                        <ShieldEllipsis />
                    </Button>
                ) : permissions.length === 0 ? (
                    <Button
                        variant="link"
                        size="xs"
                        className="text-red-700 dark:text-red-400"
                    >
                        No Permissions
                    </Button>
                ) : (
                    <Button variant="link" size="xs">
                        {permissions.length} Permission
                        {permissions.length > 1 && 's'}
                    </Button>
                )}
            </DrawerTrigger> */}

            <DrawerContent className="max-w-sm" autoFocus>
                <DrawerHeader>
                    <DrawerTitle>Permissions</DrawerTitle>
                    <DrawerDescription>
                        List of permissions assigned to{' '}
                        <span className="font-semibold">
                            {roleWithPermissions?.name}
                        </span>
                    </DrawerDescription>
                </DrawerHeader>

                <CollapsiblePermissions
                    permissions={roleWithPermissions?.permissions}
                />

                <DrawerFooter>
                    <DrawerTrigger asChild>
                        <Button variant="outline" size="sm">
                            Close
                        </Button>
                    </DrawerTrigger>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
