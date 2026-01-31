import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { Page } from '@/types/roles-permissions';

interface DialogEditRoleProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    page: Page | null;
}

export default function DialogEditPage({
    open,
    setOpen,
    page,
}: DialogEditRoleProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        slug: '',
    });

    //  sync role → form when dialog opens / role changes
    useEffect(() => {
        if (open && page) {
            setData('name', page.name);
        }
    }, [open, page, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('pages.update', page?.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Page</DialogTitle>
                        <DialogDescription>
                            Update Page information
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-3 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
