import { useForm } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import type { Permission } from '@/types/roles-permissions';

interface DialogDeleteRoleProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    permission: Permission | null;
}

export default function DialogConfimDelete({
    open,
    setOpen,
    permission,
}: DialogDeleteRoleProps) {
    const {
        setData,
        delete: destroy,
        processing,

        reset,
    } = useForm({
        name: '',
    });

    //  sync role → form when dialog opens / role changes
    useEffect(() => {
        if (open && permission) {
            setData('name', permission.name);
        }
    }, [open, permission, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        destroy(route('permissions.destroy', permission?.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete permission?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to delete user (
                        <span className="font-semibold">
                            {permission?.name}
                        </span>
                        ).
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {processing ? 'Deleting...' : 'Confirm Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
