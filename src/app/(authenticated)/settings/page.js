import { withPermission } from "@/app/lib/authentication.js";
import PermissionCheckbox from "@/components/PermissionCheckbox.js";
import RoleSettings from "@/components/RoleSettings.js";
import prisma from "@/app/lib/prisma.js";

async function SettingsPage() {
    const roles = await prisma.roles.findMany({
        include: { RolePermission: true }
    });
    const permissions = await prisma.permissions.findMany();

    return (
        <div>
            <RoleSettings roles={roles} permissions={permissions} />
        </div>
    )
}

export default withPermission(SettingsPage, 'home:view')
