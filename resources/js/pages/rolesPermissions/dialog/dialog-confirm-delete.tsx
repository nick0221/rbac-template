import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { ShieldAlert } from 'lucide-react';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

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
    }, [open, permission]);

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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                showCloseButton={false}
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-10">
                        <DialogTitle className="flex items-center">
                            <ShieldAlert className="mr-1" /> Delete
                        </DialogTitle>
                        <DialogDescription>
                            Warning: You are about to delete a permission (
                            <span className="font-semibold">
                                {permission?.name}
                            </span>
                            ), this action is irreversible.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? 'Confirming...' : 'Confirm delete'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
