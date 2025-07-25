import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

interface AuthenticationContextType {
    authToken: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
};

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export const AuthenticationProvider = ({ children }: {children: ReactNode }) => {
    const [authToken, setTokenState] = useState<string | null>(localStorage.getItem('authToken'));
    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
    };

    useEffect(() => {
        if (authToken) {
            localStorage.setItem('authToken', authToken);
        } else {
            localStorage.removeItem('authToken');
        }
    }, [authToken]);

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthenticationContext.Provider value={{ authToken, setToken, logout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthenticationContext);
    if (context === undefined) {
        throw new Error('AuthenticationProvider missing from context');
    }
    return context;
};
