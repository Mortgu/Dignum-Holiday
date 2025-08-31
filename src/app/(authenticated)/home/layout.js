import TabsComponent from "@/components/tabs/tabs.component";

export default function HomeLayout({ children }) {
    return (
        <div className='page'>
            <TabsComponent />
            {children}
        </div>
    )
}