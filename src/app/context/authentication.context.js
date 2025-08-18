import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = { state: null, dispatch: () => { } };

const authenticationContext = createContext(initialState);
export const useAuthenticationContext = () => useContext(authenticationContext);

export const authenticationReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    };
}

export const authenticationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authenticationReducer, {
        user: null
    });

    useEffect(() => { }, []);

    return (
        <authenticationContext.Provider value={{ ...state, dispatch }}>
            {children}
        </authenticationContext.Provider>
    )
}