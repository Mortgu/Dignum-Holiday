import * as React from "react"
import {
    IconCalendar,
    IconDashboard,
    IconPaperclip,
    IconReport,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.jsx";
import { ChevronDown } from "@mynaui/icons-react";
import Link from "next/link";
import Permission from "@/app/(authenticated)/Permission.js";
import prisma from "@/app/lib/prisma.js";
import { authenticate } from "@/lib/auth/core.js";

export async function AppSidebar({ ...props }) {
    const { user, payload } = await authenticate();

    const getPermissions = async () => {
        let permissions = await prisma.role_permissions.findMany({
            where: { role: user.role }, include: { permissionRelation: true },
        });

        permissions = permissions.map(permission => permission.permissionRelation.name);
        return permissions;
    }

    const hasAdminPermission = () => {
        return getPermissions().then(permissions => {
            return permissions.filter(permission => {
                return permission.split(':')[0] === 'admin'
            }).length > 0;
        });
    }

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <a href="/">
                                <span className="text-base font-semibold">Dignum.</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* <NavMain items={data.navMain}/> */}
                <NavMain />

                {await hasAdminPermission() && (
                    <SidebarMenu>
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarMenuItem>

                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <IconSettings /> Administration
                                        <ChevronDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>

                                        <Permission permission='admin:users:view'>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuButton asChild>
                                                    <Link href='/admin/users'>
                                                        <IconUsers />
                                                        Users
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuSubItem>
                                        </Permission>

                                        <Permission permission='admin:roles:view'>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuButton asChild>
                                                    <Link href='/admin/roles'>
                                                        <IconPaperclip />
                                                        Roles
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuSubItem>
                                        </Permission>

                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                )}

                {/* <NavSecondary items={data.navSecondary} className="mt-auto"/> */}
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser /> */}
            </SidebarFooter>
        </Sidebar>
    );
}
