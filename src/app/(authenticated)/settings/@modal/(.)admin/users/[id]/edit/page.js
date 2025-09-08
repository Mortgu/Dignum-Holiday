import { Modal } from "@/components/modal/modal.js";
import { ProfileForm } from "@/app/(authenticated)/settings/@modal/(.)admin/users/[id]/edit/edit-form.js";
import prisma from "@/app/lib/prisma.js";

export default async function Page({ params }) {
    const { id } = await params;

    const user = await prisma.users.findFirst({
        where: { id: parseInt(id) }, include: { roleRelation: true }
    });

    const roles = await prisma.roles.findMany();

    return (
        <Modal title='Edit users'>
            <ProfileForm user={user} roles={roles} />
        </Modal>
    )
}