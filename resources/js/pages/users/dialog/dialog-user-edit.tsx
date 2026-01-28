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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import type { Role } from '@/types/roles-permissions';
import type { User } from '@/types/users';

interface DialogEditRoleProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    user: User;
    roles: Role[];
}

export default function DialogEditUser({
    open,
    setOpen,
    user,
    roles,
}: DialogEditRoleProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role_id: '',
    });

    //  sync role → form when dialog opens / role changes
    useEffect(() => {
        if (open && user) {
            setData('name', user.name);
            setData('email', user.email);
            setData('role_id', String(user.roles[0].id));
        }
    }, [open, user, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('users.update', user.id), {
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
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Update user information
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

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Email</Label>
                            <Input
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="user_role">Role</Label>
                            <Select
                                value={data.role_id}
                                onValueChange={(e) => setData('role_id', e)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent
                                    id="user_role"
                                    className="w-full max-w-60"
                                >
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        {roles.map((role) => (
                                            <SelectItem
                                                key={role.id}
                                                value={String(role.id)}
                                            >
                                                {role.display_name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.role_id && (
                                <p className="text-xs text-destructive">
                                    {errors.role_id}
                                </p>
                            )}
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
