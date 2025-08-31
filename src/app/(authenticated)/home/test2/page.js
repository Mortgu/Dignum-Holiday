import '@/app/resources/app.scss';

import { parseAuthCookie, verifyToken } from "@/app/utils/jwt";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { withPermission } from "@/app/lib/authentication";
import TabsComponent from "@/components/tabs/tabs.component";

async function Test2Page(request) {
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));
    const payload = token ? verifyToken(token) : null;

    if (!payload) {
        redirect('/login');
    }

    return (
        <div className="page">
            Test2 Page
        </div>
    )
}

export default withPermission(Test2Page, 'home:view')