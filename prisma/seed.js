import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const roleData = [
    {
        name: 'administrator'
    },
    {
        name: 'employee'
    }
]

const userData = [
    {
        email: 'oskar.sammet@dignum.de',
        firstName: 'oskar',
        lastName: 'sammet',
        entryDate: new Date(),
        exitDate: new Date(),
        workingHours: 40,
        vacationEntitlement: 20,
        password: '$2b$10$EgK.eBWg6jsqMm/1qNBPfu/2wexUEaQZS/vOeuS2aVpYhzj6kmpiO',
        role: 1,
    },
    {
        email: 'armin.sammet@dignum.de',
        firstName: 'armin',
        lastName: 'sammet',
        entryDate: new Date(),
        exitDate: new Date(),
        workingHours: 40,
        vacationEntitlement: 20,
        password: '$2b$10$EgK.eBWg6jsqMm/1qNBPfu/2wexUEaQZS/vOeuS2aVpYhzj6kmpiO',
        role: 2,
    },
];

const permissionData = [
    {
        displayName: 'dashboard:view',
        url: '/dashboard'
    },
    {
        displayName: 'home:view',
        url: '/home'
    },
]

const rolePermissionData = [
    {
        role: 1,
        permission: 1
    },
    {
        role: 1,
        permission: 2
    },
    {
        role: 2,
        permission: 1
    },
]

export async function main() {
    for (const user of userData) {
        await prisma.users.create({ data: user });
    }

    for (const role of roleData) {
        await prisma.roles.create({ data: role });
    }

    for (const permission of permissionData) {
        await prisma.permissions.create({ data: permission });
    }

    for (const rolePermission of rolePermissionData) {
        await prisma.role_permissions.create({ data: rolePermission });
    }
}

main();