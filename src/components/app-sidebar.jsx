"use client"

import * as React from "react"
import {
    IconCalendar,
    IconCamera,
    IconChartBar,
    IconDashboard,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,
    IconFolder,
    IconHelp,
    IconInnerShadowTop,
    IconListDetails, IconPaperclip,
    IconReport,
    IconSearch,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
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

const data = {
    user: {
        name: "Dignum",
        email: "dignum@dignum.de",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },
        {
            title: "Calendar",
            url: "/calendar",
            icon: IconCalendar,
        },
        {
            title: "Reports",
            url: "/reports",
            icon: IconReport,
        },
    ],

    navSecondary: [
        {
            title: "Settings",
            url: "/settings",
            icon: IconSettings,
        },
    ],
}

export function AppSidebar({ ...props }) {
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
                <NavMain items={data.navMain}/>

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
                                    <SidebarMenuSubItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/settings/admin'>
                                                <IconUsers />
                                                General
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/settings/admin/users'>
                                                <IconUsers />
                                                Users
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuButton asChild>
                                            <Link href='/settings/admin/roles'>
                                                <IconPaperclip />
                                                Roles
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>

                <NavSecondary items={data.navSecondary} className="mt-auto"/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user}/>
            </SidebarFooter>
        </Sidebar>
    );
}
