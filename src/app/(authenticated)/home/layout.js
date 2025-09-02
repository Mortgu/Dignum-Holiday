import Tabs from "@/components/tabs/tabs.js";

export default function HomeLayout({ children, modals }) {
    return (
        <div>
            <Tabs />
            <div className='page'>
                {children}
                {modals}
            </div>
        </div>
    )
}