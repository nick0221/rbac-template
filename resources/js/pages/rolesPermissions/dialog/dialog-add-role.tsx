import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
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

interface DialogAddRoleProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function DialogAddRole({ open, setOpen }: DialogAddRoleProps) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
    }>({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('roles.store'), {
            onSuccess: () => {
                reset();
                //toast.success('New role has been successfully created!');
                setOpen(false);
            },
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create</DialogTitle>
                        <DialogDescription>
                            Register a new role
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-3 py-4">
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className="col-span-3"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                        </div>
                        <InputError message={errors.name} />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
