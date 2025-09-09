import UserTable from "./user-table.js";

import { columns } from './columns.js';
import prisma from "@/app/lib/prisma.js";
import { Suspense } from "react";

export default async function Page() {
    const users = await prisma.users.findMany({
        include: {roleRelation: true}, where: { system: false },
    });

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <UserTable columns={columns} data={users} />
        </Suspense>
    )
}