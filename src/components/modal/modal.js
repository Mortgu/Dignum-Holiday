'use client';

import './modal.scss';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function Modal({ title, children }) {
    const router = useRouter();
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    const handleOnOpenChange = (open) => {
        router.back();
        if (!open) {

        }
    };

    return (

        <Dialog open onOpenChange={handleOnOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>


    );
}
