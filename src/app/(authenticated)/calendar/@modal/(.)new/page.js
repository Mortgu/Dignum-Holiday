'use client'

import { Modal } from "@/components/modal/modal.js";
import { useModalData } from "@/app/(authenticated)/home/context.js";
import { Button } from "@/components/ui/button.jsx"

export default function Page({ children, params }) {
    const { modalData } = useModalData();

    const start = new Date(modalData.start);
    const end = new Date(modalData.end);

    const formattedStart = start.toISOString().split("T")[0];
    const formattedEnd = end.toISOString().split("T")[0];

    return (
        <Modal title='Add Calendar Entry'>
            {children}
            <input type='date' defaultValue={formattedStart} />
            <input type='date' defaultValue={formattedEnd} />
            {JSON.stringify(modalData)}
            <Button>Hallo Welt</Button>
        </Modal>
    )
}