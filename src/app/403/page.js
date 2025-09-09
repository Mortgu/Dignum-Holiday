import { SiteHeader } from "@/components/site-header.jsx";
import { SidebarInset } from "@/components/ui/sidebar.jsx";

export default async function ForbiddenPage() {
    return (
        <SidebarInset>
            <SiteHeader title='403 - Access denied'/>

            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <h1>Access denied</h1>
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}