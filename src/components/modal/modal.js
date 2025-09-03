'use client';

import './modal.scss';

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function Modal({children}) {
    const router = useRouter();
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    return (
        <div className="modal-backdrop">
            <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
                <div className='modal-header'>
                    <h3>Add Calendar Entry</h3>
                    <button onClick={onDismiss} className="close-button">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {children}
            </dialog>
        </div>
    );
}
