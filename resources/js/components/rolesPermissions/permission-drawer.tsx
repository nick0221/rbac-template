import { ShieldEllipsis } from 'lucide-react';

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

import type { Permission } from '@/types/roles-permissions';

interface PermissionsDrawerProps {
    roleName: string;
    permissions: Permission[];
    roleId: number;
    isButton?: boolean;
}

export default function PermissionDrawer({
    roleName,
    permissions,
    isButton = true,
}: PermissionsDrawerProps) {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                {isButton ? (
                    <Button variant="outline" size="sm">
                        <ShieldEllipsis />
                    </Button>
                ) : (
                    <Button variant="link" size="xs">
                        {permissions.length} Permission
                        {permissions.length > 1 ? 's' : ''}
                    </Button>
                )}
            </DrawerTrigger>

            <DrawerContent className="max-w-sm" autoFocus>
                <DrawerHeader>
                    <DrawerTitle>Permissions</DrawerTitle>
                    <DrawerDescription>
                        List of permissions assigned to{' '}
                        <span className="font-semibold">{roleName}</span>
                    </DrawerDescription>
                </DrawerHeader>

                <CollapsiblePermissions permissions={permissions} />

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
