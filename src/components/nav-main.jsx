"use client"

import { IconCalendar, IconCirclePlusFilled, IconDashboard, IconMail, IconReport } from "@tabler/icons-react";

import { Button } from "@/components/ui/button"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu, SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function NavMain({ items }) {
    const pathname = usePathname();

    const isActive = (href) => pathname.includes(href);

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton tooltip="Quick Create"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear">
                            <IconCirclePlusFilled/>
                            <span>Quick Create</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href='/'>
                            <SidebarMenuButton isActive={isActive('/')}  tooltip='Dashboard'>
                                <IconDashboard />
                                <span>Dashboard</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <Link href='/calendar'>
                            <SidebarMenuButton isActive={isActive('/calendar')}  tooltip='Calendar'>
                                <IconCalendar />
                                <span>Calendar</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <Link href='/reports'>
                            <SidebarMenuButton isActive={isActive('/reports')}  tooltip='Reports'>
                                <IconReport />
                                <span>Reports</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
