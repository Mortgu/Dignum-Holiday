import Link from "next/link";
import { Button } from "@/components/ui/button.jsx";

export default async function Page() {
    return (
        <>
            <Button>
                <Link href='/settings/admin/roles/create'>Create new Role</Link>
            </Button>
        </>
    )
}