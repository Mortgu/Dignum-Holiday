import UserTable from "./user-table.js";
import { columns } from './columns.js';

import { Suspense } from "react";
import { withPageAuth } from "@/lib/auth/wrappers.js";

import prisma from "@/app/lib/prisma.js";

export default async function AdminUsersPage() {
    const { user, payload } = await withPageAuth('admin:users:view');

    const users = await prisma.users.findMany({
        include: {roleRelation: true}, where: { system: false },
    });

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <UserTable columns={columns} data={users} />
        </Suspense>
    )
}