import { DataTable } from "./data-table.js";

import { columns } from './columns.js';
import prisma from "@/app/lib/prisma.js";

export default async function Page() {
    const users = await prisma.users.findMany({
        include: {roleRelation: true}, where: { system: false },
    });

    return (
        <DataTable columns={columns} data={users} />
    )
}