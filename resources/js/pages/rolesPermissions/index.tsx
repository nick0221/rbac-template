import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tabListMenu } from '@/data/tab-menu-items';
import AppLayout from '@/layouts/app-layout';

import TabContentPage from './tab/tab-page';
import TabContentPermission from './tab/tab-permission';
import TabContentRole from './tab/tab-role';

import type { BreadcrumbItem, SharedData } from '@/types';
import type { RolesPermissionsPageProps } from '@/types/roles-permissions';

const breadcrumbs: BreadcrumbItem[] = [
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
    const { flash } = usePage<SharedData>().props;

    // Show Toast Message
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles, Permissions & Pages" />
            <div className="flex h-full flex-1 flex-col gap-10 overflow-x-auto rounded-xl p-4">
                {/* Tabs */}

                <Tabs defaultValue="roles" className="w-full">
                    <TabsList className="mx-auto flex w-full max-w-sm items-center justify-center">
                        {tabListMenu.map((menu) => (
                            <TabsTrigger key={menu.value} value={menu.value}>
                                {menu.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="roles" className="p-2">
                        <TabContentRole roles={roles} />
                    </TabsContent>
                    <TabsContent value="permissions" className="p-2">
                        <TabContentPermission
                            allRoles={allRoles}
                            permissions={permissions}
                        />
                    </TabsContent>
                    <TabsContent value="pages" className="p-2">
                        <TabContentPage pages={pages} />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
