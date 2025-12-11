import { createContext, useContext, useState} from "react";
const SessionContext = createContext(null);

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    // Inicializamos leyendo de localStorage para no perder la sesión al recargar
    const [token, setToken] = useState(() => localStorage.getItem('app_token'));
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('app_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    // isLoggedIn depende de si tenemos usuario
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    const logout = () => {
        setIsLoggedIn(false); 
        setUser(null);
        setToken(null);
        localStorage.removeItem('app_token');
        localStorage.removeItem('app_user');
    };

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        setIsLoggedIn(true);
        
        // Guardamos en localStorage (CRÍTICO si usas userService externo)
        if(tokenData) localStorage.setItem('app_token', tokenData);
        if(userData) localStorage.setItem('app_user', JSON.stringify(userData));
    }

    return (
        <SessionContext.Provider value={{ 
            isLoggedIn, setIsLoggedIn, 
            user, setUser,
            token, setToken, // <--- ESTO FALTABA Y ROMPÍA TODO
            login, logout
        }}>
            { children }
        </SessionContext.Provider>
    );
}