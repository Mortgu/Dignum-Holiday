import '@/app/resources/app.scss';

import { redirect } from "next/navigation";
import { withPermission } from "@/app/lib/authentication";

async function HomePage(request) {
    redirect('/home');
}

export default withPermission(HomePage, 'home:view')