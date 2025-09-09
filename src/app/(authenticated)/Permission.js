import prisma from "@/app/lib/prisma.js";
import { authenticate } from "@/lib/auth/core.js";

export default async function Permission({ permission, children }) {
    const { user, payload } = await authenticate();

    if (!payload) {
        return (
            <div><p>You are not authenticated!</p></div>
        )
    }

    console.log(user, payload)

    if (user.roleRelation.system) {
        return <>{children}</>;
    }

    const getPermissions = await prisma.role_permissions.findMany({
        include: { permissionRelation: true }, where: { role: payload.role.id }
    });

    const hasPermission = getPermissions.some(e => {
        return e.permissionRelation.name === permission;
    });


    if (!hasPermission) {
        return (
            <></>
        )
    }

    return (
        <>{children}</>
    )
}