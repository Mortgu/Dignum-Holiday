import { SettingsContextProvider } from "@/components/settings/settings.js";

export default function SettingsLayout({ children }) {
    return (
        <SettingsContextProvider>
            {children}
        </SettingsContextProvider>
    )
}
