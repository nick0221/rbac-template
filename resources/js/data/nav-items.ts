import { LayoutGrid, Shield, Users2 } from 'lucide-react';

import { dashboard } from '@/routes';
import roles from '@/routes/roles';
import users from '@/routes/users';

import type { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: users.index(),
        icon: Users2,
    },
];

export const footerNavItems: NavItem[] = [
    {
        title: 'Roles, Permissions & Pages',
        href: roles.index(),
        icon: Shield,
    },
];
