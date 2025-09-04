'use client';

import { Modal } from "@/components/modal/modal.js";
import { ProfileForm } from "@/app/(authenticated)/settings/@modal/(.)admin/users/edit/edit-form.js";
import { useModalData } from "@/app/(authenticated)/home/context.js";

export default function Page() {
    const { modalData } = useModalData();

    return (
        <Modal title='Edit users'>
            <ProfileForm user={modalData.user} />
        </Modal>
    )
}