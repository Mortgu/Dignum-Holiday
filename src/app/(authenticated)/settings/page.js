import { withPermission } from "@/app/lib/authentication.js";

import RoleSettings from "@/components/RoleSettings.js";
import prisma from "@/app/lib/prisma.js";
import Permission from "@/app/(authenticated)/Permission.js";

async function SettingsPage() {
    const roles = await prisma.roles.findMany({
        where: {system: false}, include: {RolePermission: true}
    });

    const permissions = await prisma.permissions.findMany();

    return (
        <div>
            <Permission permission='roles:create'>
                <RoleSettings roles={roles} permissions={permissions}/>
            </Permission>
        </div>
    )
}

export default withPermission(SettingsPage, 'home:view')
