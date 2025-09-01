import { checkAuthentication } from "@/app/lib/authentication.js";
import prisma from "@/app/lib/prisma.js";

export default async function Permission({ permission, children }) {
    const { payload } = await checkAuthentication()

    if (!payload) {
        return (
            <div><p>You are not authenticated!</p></div>
        )
    }

    const getPermissions = await prisma.role_permissions.findMany({
        include: { permissionRelation: true }, where: { role: payload.role.id }
    });

    const hasPermission = getPermissions.some(e => {
        return e.permissionRelation.name === permission;
    });

    console.log("hasPermission", getPermissions)

    if (!hasPermission) {
        return (
            <></>
        )
    }

    return (
        <>{children}</>
    )
}