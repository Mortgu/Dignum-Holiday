import { parseAuthCookie, verifyToken } from "@/app/utils/jwt";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/dashboard/LogoutButton";
import Link from "next/link";

export default async function DashboardPage(request) {
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));
    const payload = token ? verifyToken(token) : null;

    if (!payload) {
        redirect('/login');
    }

    return (
        <div>
            <h1>Welcome, {payload.name}</h1>
            <p>User Id: {payload.uid}</p>
            <p>role: {payload.role}</p>
            <Link href='/'>Home</Link>
            <LogoutButton />
        </div>
    )
}