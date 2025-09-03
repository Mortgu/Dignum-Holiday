import TabsNavigation, { TabsItem } from "@/components/tabs/tabs.navigation.js";
import MyCalendar from "@/components/calendar/calendar.js";
import { ModalDataProvider } from "@/app/(authenticated)/home/context.js";

export default function HomeLayout({ children, modal }) {
    return (
        <div>
            <TabsNavigation>
                <TabsItem href='/home'>Home</TabsItem>
                <TabsItem href='/home/test'>Test</TabsItem>
            </TabsNavigation>

            <ModalDataProvider>
                <div className='page'>
                    {children}
                </div>

                {modal}
            </ModalDataProvider>
        </div>
    )
}