import { withPermission } from "@/app/lib/authentication.js";

async function SettingsPage() {

    return (
        <></>
    )
}

export default withPermission(SettingsPage, 'settings:view')
