import client from '@/app/utils/db';
import prisma from "@/app/lib/prisma.js";

export async function getPermissionsForRole(role) {
    const query = await client.query('SELECT name, route, p.permission FROM role_permissions AS rp JOIN roles ON rp.role=roles.id JOIN permissions AS p ON rp.permission=p.pid WHERE name=$1', [role]);
    const rows = query.rows;

    return rows.map(rp => rp.permission);
}

export async function getPermissionsForRole2(roleId) {
    const permissions = await prisma.role_permissions.findMany({
        where: { id: roleId }, include: { permissionRelation: true }
    });

    return permissions.map(obj => obj.permissionRelation.displayName);
}

export const checkPermission = async (role, required) => {
    const permissions = await getPermissionsForRole2(role);
    console.log("permissions2: ", permissions)
    return permissions.includes(required);
}
