import prisma from "@/app/lib/prisma.js";

export async function getPermissionsForRole(roleId) {
    const permissions = await prisma.role_permissions.findMany({
        where: { role: roleId }, include: { permissionRelation: true }
    });

    return permissions.map(obj => obj.permissionRelation.name);
}

export const checkPermission = async (role, required) => {
    const permissions = await getPermissionsForRole(role);
    return permissions.includes(required);
}
