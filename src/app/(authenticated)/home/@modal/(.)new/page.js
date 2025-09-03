'use client'

import { Modal } from "@/components/modal/modal.js";
import { useModalData } from "@/app/(authenticated)/home/context.js";

export default function Page({ children, params }) {
    const { modalData } = useModalData();

    return (
        <Modal>
            {children}
            {JSON.stringify(modalData)}
        </Modal>
    )
}