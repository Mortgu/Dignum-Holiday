import client from '@/app/utils/db';

export async function getPermissionsForRole(role) {
    const query = await client.query('SELECT name, route, p.permission FROM role_permissions AS rp JOIN roles ON rp.role=roles.id JOIN permissions AS p ON rp.permission=p.pid WHERE name=$1', [role]);
    const rows = query.rows;

    return rows.map(rp => rp.permission);
}

export const checkPermission = async (role, required) => {
    const permissions = await getPermissionsForRole(role);
    return permissions.includes(required);
}
