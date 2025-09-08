import { withPermission } from "@/app/lib/authentication";
import { SiteHeader } from "@/components/site-header.jsx";
import { SectionCards } from "@/components/section-cards.jsx";
import { DataTable } from "@/components/data-table.jsx";
import { SidebarInset } from "@/components/ui/sidebar.jsx";

import data from "./data.json"


async function HomePage(request) {
    return (
        <SidebarInset>
            <SiteHeader title='Dashboard' />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        {/* <SectionCards/> */}

                        {/* <DataTable data={data}/> */}
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}

export default withPermission(HomePage, 'home:view')