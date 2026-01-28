import { useForm } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
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

import type { User } from '@/types/users';

interface DialogDeleteUserProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    user: User | null;
}

export default function DialogConfimDeleteUser({
    open,
    setOpen,
    user,
}: DialogDeleteUserProps) {
    const {
        delete: destroy,
        processing,

        reset,
    } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        destroy(route('users.destroy', user?.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete user?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Warning: You are about to delete user (
                        <span className="font-semibold">{user?.name}</span>
                        ).
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant={'outline'}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant={'destructive'}
                        onClick={handleSubmit}
                    >
                        {processing ? 'Deleting...' : 'Confirm Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
