import { createContext, useState, useContext } from 'react';
const SessionContext = createContext();
export function SessionProvider({ children }) {
    const [isInitiated, setIsInitiated] = useState(false);
    return <SessionContext.Provider value={{ isInitiated, setIsInitiated }}>
            {children}
        </SessionContext.Provider>;
}
export function useSession() {
    return useContext(SessionContext);
}