import { UserCreationForm } from "@/components/settings/users.js";
import { CreateUserForm } from "@/app/(authenticated)/settings/@modal/(.)admin/users/create/create-form.js";
import prisma from "@/app/lib/prisma.js";

export default async function Page({ children }) {
    const roles = await prisma.roles.findMany();

    return (
        <div className="grid items-center px-4 lg:px-6">
            <div className="overflow-hidden rounded-md">
                <CreateUserForm roles={roles} />
            </div>
        </div>
    )
}