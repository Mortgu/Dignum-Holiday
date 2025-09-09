import Link from "next/link";
import { Button } from "@/components/ui/button.jsx";
import { withPageAuth } from "@/lib/auth/wrappers.js";

export default async function Page() {
    const { user, payload } = await withPageAuth('admin:roles:view');

    return (
        <>
            <Button>
                <Link href='/admin/roles/create'>Create new Role</Link>
            </Button>
        </>
    )
}