import { Modal } from "@/components/modal/modal.js";

import { CreateUserForm } from "@/app/(authenticated)/settings/@modal/(.)admin/users/create/create-form.js";
import prisma from "@/app/lib/prisma.js";
import { parseAuthCookie, verifyToken } from "@/app/utils/jwt.js";
import { headers } from "next/headers";

export default async function Page() {
    // 1. Benutzerdaten aus dem Cookie abrufen
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));
    const user = token ? verifyToken(token) : null;

    // 2. Rollen abrufen, deren ID kleiner ist als die Rolle des aktuellen Benutzers
    //    (Annahme: user.roleId ist im Token-Payload verfügbar)
    const roles = await prisma.roles.findMany({
        where: {
            system: false,
            id: { gt: user?.role }
        }
    });

    return (
        <Modal title='Create user'>
            <CreateUserForm roles={roles} />
        </Modal>
    )
}