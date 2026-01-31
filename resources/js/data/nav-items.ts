import { LayoutGrid, Settings2Icon, Shield, Users2 } from 'lucide-react';

import { dashboard } from '@/routes';
import admin from '@/routes/admin';
import roles from '@/routes/roles';
import users from '@/routes/users';

import type { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        slug: 'dashboard',
        alwaysVisible: true,
    },
    {
        title: 'Users',
        href: users.index(),
        icon: Users2,
        slug: 'users',
    },
    {
        title: 'Roles, Permissions & Pages',
        href: roles.index(),
        icon: Shield,
        slug: 'roles',
    },
];

export const footerNavItems: NavItem[] = [
    // {
    //     title: 'Approver Tools',
    //     href: '#',
    //     icon: ListChecks,
    // },
    {
        title: 'Super Admin Tools',
        href: admin.tools.index(),
        icon: Settings2Icon,
        slug: 'admin-tools',
    },
];
