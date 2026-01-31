import { Link, usePage } from '@inertiajs/react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { footerNavItems, mainNavItems } from '@/data/nav-items';
import { dashboard } from '@/routes';

import AppLogo from './app-logo';

import type { NavItem, SharedData } from '@/types';

export function AppSidebar() {
    const { allowedPages } = usePage<SharedData>().props.auth;

    const filterByPermission = (items: NavItem[]) =>
        items.filter(
            (item) => item.alwaysVisible || allowedPages.includes(item.slug),
        );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filterByPermission(mainNavItems)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter
                    items={filterByPermission(footerNavItems)}
                    className="mt-auto"
                />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
