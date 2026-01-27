import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { InfoIcon } from 'lucide-react';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
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

import type { Permission } from '@/types/roles-permissions';

interface DialogEditRoleProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    permission: Permission;
}

export default function DialogEditPermission({
    open,
    setOpen,
    permission,
}: DialogEditRoleProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
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

        put(route('permissions.update', permission.id), {
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
                        <DialogTitle>Edit permission</DialogTitle>
                        <DialogDescription>
                            <span className="flex justify-start text-xs text-muted-foreground italic">
                                <InfoIcon className="mr-1" />
                                Note: permission name is case sensitive and must
                                be unique, make sure also that the permission
                                name matches the route name used in the app.
                            </span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-3 py-4">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="pageName">Page </Label>
                                <Badge
                                    id="pageName"
                                    variant="secondary"
                                    className="ml-2 text-lg"
                                >
                                    {permission.page.name}
                                </Badge>
                            </div>

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
