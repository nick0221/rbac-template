import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/datatables/DataTable';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

import { userColumns } from './datatable/user-columns';
import { RegisterUserModal } from './registerUserModal';

import type { BreadcrumbItem } from '@/types';
import type { User, UsersIndexPageProps } from '@/types/users';

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
    filters,
    flash,
}: UsersIndexPageProps) {
    const [open, setOpen] = useState(false);
    const hasShownToast = useRef(false);

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
                        search={filters.search}
                    />

                    <RegisterUserModal
                        open={open}
                        onClose={() => setOpen(false)}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
