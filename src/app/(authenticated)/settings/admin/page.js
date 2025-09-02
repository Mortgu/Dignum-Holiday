import Permission from "@/app/(authenticated)/Permission.js";
import RoleCreationForm from "@/components/settings/RoleCreationForm.js";
import { RoleContextProvider } from "@/components/settings/roles.display.js";
import RoleSettings from "@/components/settings/RoleSettings.js";
import Users from "@/components/settings/users.js";

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
            <Permission permission='roles:create'>
                <fieldset>
                    <legend>Role Creation</legend>
                    <RoleCreationForm permissions={permissions} />
                </fieldset>
            </Permission>
            <Permission permission='roles:modify'>
                <fieldset>
                    <legend>Roles</legend>
                    <RoleContextProvider>
                        <RoleSettings roles={roles} permissions={permissions}/>
                    </RoleContextProvider>
                </fieldset>
            </Permission>

            <Permission permission='users:create'>
                <Users users={users} roles={roles} />
            </Permission>
        </div>
    )
}