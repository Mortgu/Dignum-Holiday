import '@/app/resources/app.scss';

import { parseAuthCookie, verifyToken } from "@/app/utils/jwt";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation/navigation.component";
import { withPermission } from "@/app/lib/authentication";

async function HomePage(request) {
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));
    const payload = token ? verifyToken(token) : null;

    if (!payload) {
        redirect('/login');
    }

    return (
        <div className="page">
            <p>{JSON.stringify(payload)}</p>
        </div>
    )
}

export default withPermission(HomePage, 'home:view')