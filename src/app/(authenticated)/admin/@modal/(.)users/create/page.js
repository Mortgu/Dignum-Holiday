import { Modal } from "@/components/modal/modal.js";

import { CreateUserForm } from "@/app/(authenticated)/admin/@modal/(.)users/create/create-form.js";
import prisma from "@/app/lib/prisma.js";
import { parseAuthCookie, verifyToken } from "@/app/utils/jwt.js";
import { headers } from "next/headers";

export default async function Page() {
    // 1. Benutzerdaten aus dem Cookie abrufen
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));
    const user = token ? verifyToken(token) : null;

    console.log(user)
    const roles = await prisma.roles.findMany({
        where: {
            system: false,
            id: { gt: user.role.id }
        }
    });

    return (
        <Modal title='Create user'>
            <CreateUserForm roles={roles} />
        </Modal>
    )
}