import { SettingsContextProvider } from "@/components/settings/settings.js";
import TabsNavigation, { TabsItem } from "@/components/tabs/tabs.navigation.js";

export default function SettingsLayout({ children }) {
    return (
        <SettingsContextProvider>
            <TabsNavigation>
                <TabsItem href='/settings'>General</TabsItem>
                <TabsItem href='/settings/admin'>Administration</TabsItem>
            </TabsNavigation>
            <div className='page'>
                {children}
            </div>
        </SettingsContextProvider>
    )
}
