import { parseAuthCookie, verifyToken } from "@/app/utils/jwt";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/(authenticated)/dashboard/LogoutButton";
import Navigation from "@/components/navigation/navigation.component";
import { withPermission } from "@/app/lib/authentication";

async function DashboardPage(request) {
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));
    const payload = token ? verifyToken(token) : null;

    if (!payload) {
        redirect('/login');
    }

    return (
        <div className="page">
            <LogoutButton/>
        </div>
    )
}

export default withPermission(DashboardPage, 'dashboard:view');