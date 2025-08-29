
import { parseAuthCookie, verifyToken } from "@/app/utils/jwt";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/dashboard/LogoutButton";
import Navigation from "@/components/navigation/navigation.component";
import { Fragment } from "react";

export default async function HomePage(request) {
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));
    const payload = token ? verifyToken(token) : null;

    if (!payload) {
        redirect('/login');
    }

    return (
        <Fragment>
            <div>
                <h1>Welcome, {payload.name}</h1>
                <p>User Id: {payload.uid}</p>
                <LogoutButton/>
            </div>
        </Fragment>

    )
}
