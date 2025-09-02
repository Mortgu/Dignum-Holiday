"use client";

import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
    state: null, dispatch: () => { }
}

const RoleContext = createContext(initialState);
export const useRoleContext = () => useContext(RoleContext);

export const RoleContextProvider = ({children}) => {
    const [state, dispatch] = useState(false);

    useEffect(() => {
    }, [state]);

    return (
        <RoleContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RoleContext.Provider>
    );
}