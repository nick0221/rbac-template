import { Head, router } from '@inertiajs/react';
import { Database } from 'lucide-react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Super Admin Tools',
        href: '#',
    },
];

export default function SuperAdminToolsPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Super Admin Tools</h1>

                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="p-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="inline-block w-fit">
                                    <Button
                                        type="button"
                                        disabled
                                        className="flex items-center"
                                        variant="outline"
                                        onClick={() => {
                                            toast.promise(
                                                new Promise<void>(
                                                    (resolve, reject) => {
                                                        router.get(
                                                            route(
                                                                'admin.reset.db',
                                                            ),
                                                            {},
                                                            {
                                                                preserveScroll: true,
                                                                onSuccess: () =>
                                                                    resolve(),
                                                                onError: (
                                                                    errors,
                                                                ) => {
                                                                    reject(
                                                                        errors,
                                                                    );
                                                                },
                                                            },
                                                        );
                                                    },
                                                ),
                                                {
                                                    loading:
                                                        'Resetting database, you will need to login again afterwards.',
                                                    success:
                                                        'Database has been reset',
                                                    error: (
                                                        errors: unknown,
                                                    ) => {
                                                        if (
                                                            errors &&
                                                            typeof errors ===
                                                                'object' &&
                                                            'reset' in errors
                                                        ) {
                                                            const val = (
                                                                errors as Record<
                                                                    string,
                                                                    unknown
                                                                >
                                                            )['reset'];
                                                            return typeof val ===
                                                                'string'
                                                                ? val
                                                                : 'Reset failed';
                                                        }

                                                        return 'Reset failed';
                                                    },
                                                },
                                            );
                                        }}
                                    >
                                        <span className="flex items-center">
                                            <Database className="mr-1" />
                                            Reset database
                                        </span>
                                    </Button>
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                This feature is temporarily disabled
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
