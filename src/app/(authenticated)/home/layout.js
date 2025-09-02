import TabsNavigation, { TabsItem } from "@/components/tabs/tabs.navigation.js";

export default function HomeLayout({ children, modals }) {
    return (
        <div>
            <TabsNavigation>
                <TabsItem href='/home'>Home</TabsItem>
                <TabsItem href='/home/test'>Test</TabsItem>
            </TabsNavigation>
            <div className='page'>
                {children}
                {modals}
            </div>
        </div>
    )
}