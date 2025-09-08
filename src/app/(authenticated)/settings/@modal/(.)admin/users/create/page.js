import { Modal } from "@/components/modal/modal.js";

import { CreateUserForm } from "@/app/(authenticated)/settings/@modal/(.)admin/users/create/create-form.js";
import prisma from "@/app/lib/prisma.js";

export default async function Page({ params, searchParams }) {

    const roles = await prisma.roles.findMany();

    return (
        <Modal title='Create user'>
            <CreateUserForm roles={roles} />
        </Modal>
    )
}