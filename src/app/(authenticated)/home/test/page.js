import '@/app/resources/app.scss';

import { parseAuthCookie, verifyToken } from "@/app/utils/jwt";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { withPermission } from "@/app/lib/authentication";
import { prisma } from "@/app/lib/prisma";

async function TestPage(request) {
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));
    const payload = token ? verifyToken(token) : null;

    if (!payload) {
        redirect('/login');
    }

    const users = await prisma.user.findMany();

    return (
        <div className="page">
            {users.map((user) => (
                <li key={user.id} className="mb-2">
                    {user.name}
                </li>
            ))}
        </div>
    )
}

export default withPermission(TestPage, 'home:view')