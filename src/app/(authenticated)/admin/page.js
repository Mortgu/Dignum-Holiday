import { withPageAuth } from "@/lib/auth/wrappers.js";

export default async function AdminSettingsPage() {
    const { user, payload } = await withPageAuth('admin:view');

    return (
        <>AdminSettingsPage</>
    )
}