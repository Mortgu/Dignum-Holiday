"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/login";
    }

    return (
        <nav className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
            <Link href="/" className="font-bold text-lg">
                MyApp
            </Link>

            <div className="flex gap-4">
                {isLoggedIn ? (
                    <>
                        <Link href="/dashboard">Dashboard</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login">Login</Link>
                        <Link href="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}