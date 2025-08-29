import { createContext, useContext, useState } from "react";

const SessionContext = createContext(null);

export const useSession = () => useContext(SessionContext);
export default useSession;

export const SessionProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roles, setRoles] = useState([]);

    return <SessionContext.Provider value = {{isLoggedIn, setIsLoggedIn, roles, setRoles}}>
        { children }
    </SessionContext.Provider>;
}