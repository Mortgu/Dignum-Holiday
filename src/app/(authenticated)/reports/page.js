import { SiteHeader } from "@/components/site-header"
import { SidebarInset } from "@/components/ui/sidebar"
import MyCalendar from "@/components/calendar/calendar.js";

export default function ReportsPage() {
    return (
        <SidebarInset>
            <SiteHeader title='Reports'/>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}
