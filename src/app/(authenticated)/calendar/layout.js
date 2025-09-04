import { SettingsContextProvider } from "@/components/settings/settings.js";
import { SiteHeader } from "@/components/site-header.jsx";
import { SidebarInset } from "@/components/ui/sidebar.jsx";
import { ModalDataProvider } from "@/app/(authenticated)/home/context.js";


export default function SettingsLayout({ children, modal }) {
    return (
        <SettingsContextProvider>
            <ModalDataProvider>
                {modal}

                <SidebarInset>
                    <SiteHeader title='Calendar'/>

                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </ModalDataProvider>
        </SettingsContextProvider>
    )
}
