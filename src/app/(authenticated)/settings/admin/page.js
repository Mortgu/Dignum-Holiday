import Permission from "@/app/(authenticated)/Permission.js";
import RoleCreationForm from "@/components/settings/RoleCreationForm.js";
import { RoleContextProvider } from "@/components/settings/roles.display.js";
import RoleSettings from "@/components/settings/RoleSettings.js";
import Users from "@/components/settings/users.js";
import RoleSettingSection from "@/components/settings/roles.js";

export default async function AdminSettingsPage() {
    const roles = await prisma.roles.findMany({
        include: {RolePermission: true}
    });

    const permissions = await prisma.permissions.findMany({
        select: {id: true, name: true}
    });

    const users = await prisma.users.findMany({
        include: { roleRelation: true }
    });

    return (
        <div>
            <RoleSettingSection roles={roles} permissions={permissions} />

            <Permission permission='users:create'>
                <Users users={users} roles={roles} />
            </Permission>
        </div>
    )
}