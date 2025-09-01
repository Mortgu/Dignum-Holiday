import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const initialRoles = [
    { name: 'system', system: true },
    { name: 'test' },
    { name: 'user', system: true }
]

const initialUsers = [{
    email: 'system@local',
    firstName: 'system',
    lastName: '',
    entryDate: new Date(),
    exitDate: new Date(),
    workingHours: 0,
    vacationEntitlement: 0,
    password: '$2b$10$EgK.eBWg6jsqMm/1qNBPfu/2wexUEaQZS/vOeuS2aVpYhzj6kmpiO',
    role: 1,
}, {
    email: 'user@local',
    firstName: 'user',
    lastName: '',
    entryDate: new Date(),
    exitDate: new Date(),
    workingHours: 0,
    vacationEntitlement: 0,
    password: '$2b$10$EgK.eBWg6jsqMm/1qNBPfu/2wexUEaQZS/vOeuS2aVpYhzj6kmpiO',
    role: 2,
}];

const initialPermissions = [
    { name: 'users:create' },
    { name: 'users:modify' },
    { name: 'users:delete' },
    { name: 'roles:create' },
    { name: 'roles:modify' },
    { name: 'roles:delete' },
    { name: 'dashboard:view', base: true },
    { name: 'home:view', base: true },
    { name: 'settings:view', base: true },
]

const initialRolePermissions = [
    { role: 1, permission: 1 },
    { role: 1, permission: 2 },
    { role: 1, permission: 3 },
    { role: 1, permission: 4 },
    { role: 1, permission: 5 },
    { role: 1, permission: 6 },
    { role: 1, permission: 7 },
    { role: 1, permission: 8 },
    { role: 1, permission: 9 },
    { role: 2, permission: 7 },
    { role: 2, permission: 8 },
    { role: 2, permission: 9 },
]

export async function main() {
    for (const role of initialRoles) {
        await prisma.roles.create({data: role});
    }

    for (const permission of initialPermissions) {
        await prisma.permissions.create({data: permission});
    }

    for (const rolePermission of initialRolePermissions) {
        await prisma.role_permissions.create({data: rolePermission});
    }

    for (const user of initialUsers) {
        await prisma.users.create({data: user});
    }
}

main();