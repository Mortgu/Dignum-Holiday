import { parseAuthCookie, verifyToken } from "@/app/utils/jwt";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage(request) {
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));
    const payload = token ? verifyToken(token) : null;

    if (!payload) {
        redirect('/login');
    }

    return (
        <div>
            <h1>Welcome, {payload.username}</h1>
            <p>User Id: {payload.uid}</p>
        </div>
    )
}