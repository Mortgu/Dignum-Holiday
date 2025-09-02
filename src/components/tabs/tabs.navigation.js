"use client";

import "./tabs.scss";

import Link from "next/link";
import { usePathname } from "next/navigation.js";

export default function TabsNavigation({children}) {

    return (
        <div className="tab-navigation">
            {children}
        </div>
    )
}

export const TabsItem = ({href, children}) => {
    const pathname = usePathname();
    const isActive = (href) => pathname === href;

    return (
        <Link href={href} className={`tab-navigation-item ${isActive(href) && 'active'}`}>{children}</Link>
    )
}