import { createContext, useContext, useState } from "react";
const SessionContext = createContext(null);

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const logout = () => {
        setIsLoggedIn(false); 
        setUser(null);
        //localStorage.removeItem('app_token'); // Limpiar token si se guarda
    };

    const login = (userData, token) => {
        setUser(userData);
        setIsLoggedIn(true);
        
        if(token) localStorage.setItem('app_token', token); // Opcional
    }

    return (
        <SessionContext.Provider value={{ 
            isLoggedIn, setIsLoggedIn, 
            user, setUser,
            login, logout
        }}>
            { children }
        </SessionContext.Provider>
    );
}