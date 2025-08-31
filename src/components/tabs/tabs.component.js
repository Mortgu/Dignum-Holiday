"use client";

import Link from "next/link";

export default function TabsComponent() {

    return (
        <div>
            <div className="">
                <Link href='/home/test'>Test</Link>
                <Link href='/home/test2'>Test2</Link>
            </div>
        </div>
    )
}
