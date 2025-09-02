import prisma from "@/app/lib/prisma.js";

export async function getPermissionsForRole(roleId) {
    const permissions = await prisma.role_permissions.findMany({
        where: { role: roleId }, include: { permissionRelation: true }
    });

    return permissions.map(obj => obj.permissionRelation.name);
}

/**
 *
 * @param role = role object with id, name and system
 * @param required
 * @returns {Promise<*>}
 */
export const checkPermission = async (role, required) => {
    /** Check if role id equals 1 and role is market as system role */
    if (role.id === 1 && role.system) return true;

    const permissions = await getPermissionsForRole(role.id);
    return permissions.includes(required);
}
