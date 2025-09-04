import { withPermission } from "@/app/lib/authentication.js";
import { SiteHeader } from "@/components/site-header.jsx";
import { DataTable } from "@/components/data-table.jsx";
import data from "@/app/(authenticated)/dashboard/data.json";
import { SidebarInset } from "@/components/ui/sidebar.jsx";

async function SettingsPage() {

    return (
        <SidebarInset>
            <SiteHeader title='Account Settings' />

            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <DataTable data={data}/>
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}

export default withPermission(SettingsPage, 'settings:view')
