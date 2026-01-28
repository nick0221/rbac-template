import { Head, usePage } from '@inertiajs/react';
import { UserPlus2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/datatables/DataTable';
import AppLayout from '@/layouts/app-layout';

import { userColumns } from './datatable/user-columns';
import { RegisterUserModal } from './registerUserModal';

import type { BreadcrumbItem, SharedData } from '@/types';
import type { User, UsersIndexPageProps } from '@/types/users';

import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Users',
        href: '#',
    },
];

export default function UsersIndexPage({
    users,
    allRoles,
    flash,
}: UsersIndexPageProps) {
    const [open, setOpen] = useState(false);
    const { generalError = '' } = usePage<SharedData>().props;
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (!hasShownToast.current && generalError)
            toast.error(
                typeof generalError === 'string'
                    ? generalError
                    : String(generalError),
                { richColors: true },
            );
        hasShownToast.current = true;
    }, [generalError]);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error, { richColors: true });
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* User Tables */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTable<User>
                        data={users.data}
                        columns={userColumns}
                        title="Users"
                        total={users.total}
                        onCreate={() => setOpen(true)}
                        currentPage={users.current_page}
                        lastPage={users.last_page}
                        perPage={users.per_page}
                        createButtonIcon={UserPlus2}
                        filterKey="users_search"
                    />

                    <RegisterUserModal
                        open={open}
                        onClose={() => setOpen(false)}
                        roles={allRoles}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
