"use client";

import { createContext, useContext, useState } from "react";

const ModalDataContext = createContext(null);

export function ModalDataProvider({ children }) {
    const [modalData, setModalData] = useState(null);

    return (
        <ModalDataContext.Provider value={{ modalData, setModalData }}>
            {children}
        </ModalDataContext.Provider>
    );
}

export function useModalData() {
    return useContext(ModalDataContext);
}