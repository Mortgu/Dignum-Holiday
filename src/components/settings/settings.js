"use client";

import { createContext, useContext, useReducer } from "react";

const SettingsContext = createContext({
    state: null, dispatch: () => {
    }
});
export const useSettingsContext = () => useContext(SettingsContext);

const SettingsContextReducer = (state, action) => {
    switch (action.type) {
        case 'update_user_display':
            console.log('update_user_display')
            return { ...state, users: [...state.users, action.payload] }
        default:
            return state;
    }
}

export const SettingsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SettingsContextReducer, {
       users: []
    });

    return (
        <SettingsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SettingsContext.Provider>
    )
}