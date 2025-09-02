"use client";

import "./tabs.scss";

import Link from "next/link";
import { usePathname } from "next/navigation.js";

export default function Tabs() {
    const pathname = usePathname();

    const isActive = (href) => pathname === href;

    return (
        <div className="tab-navigation">
            <Link href='/home' className={isActive('/home') ? 'tab-navigation-item active' : 'tab-navigation-item'}>Home</Link>
            <Link href='/home/test' className={isActive('/home/test') ? 'tab-navigation-item active' : 'tab-navigation-item'}>Test</Link>
            <Link href='/home/test2' className={isActive('/home/test2') ? 'tab-navigation-item active' : 'tab-navigation-item'}>Test2</Link>
        </div>
    )
}
