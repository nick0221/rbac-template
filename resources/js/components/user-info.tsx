import { usePage } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

import type { SharedData, User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
    showRoleName = false,
}: {
    user: User;
    showEmail?: boolean;
    showRoleName?: boolean;
}) {
    const getInitials = useInitials();
    const { props } = usePage<SharedData>();
    const role = props.auth.role;

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showRoleName && (
                    <span className="truncate text-xs text-muted-foreground">
                        {role.name}
                    </span>
                )}
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
