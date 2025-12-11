import { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export function SessionProvider({ children }) {
    const [user, setUser] = useState(null); 
    const [token, setToken] = useState(null);

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return <SessionContext.Provider value={{ user, token, login, logout, isInitiated: !!user }}>
            {children}
        </SessionContext.Provider>;
}
export function useSession() {
    return useContext(SessionContext);
}