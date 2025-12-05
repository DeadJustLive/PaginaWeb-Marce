import React, { createContext, useContext, useState, useEffect } from 'react';

interface Address {
    id: string;
    title: string;
    region: string;
    commune: string;
    address: string;
}

interface User {
    email: string;
    name?: string;
    phone?: string;
    addresses?: Address[];
    isGuest?: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password?: string) => Promise<void>;
    register: (email: string, password?: string, name?: string) => Promise<void>;
    loginAsGuest: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount (mock persistence)
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email: string, _password?: string) => {
        // Mock login
        const mockUser: User = {
            email,
            name: email.split('@')[0],
            phone: '+56 9 1234 5678',
            addresses: [
                {
                    id: '1',
                    title: 'Casa',
                    region: 'Metropolitana',
                    commune: 'Santiago',
                    address: 'Av. Siempre Viva 742'
                },
                {
                    id: '2',
                    title: 'Oficina',
                    region: 'Metropolitana',
                    commune: 'Providencia',
                    address: 'Av. Providencia 1234, Of 505'
                }
            ]
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    };

    const register = async (email: string, _password?: string, name?: string) => {
        // Mock register
        const mockUser = { email, name: name || email.split('@')[0] };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    };

    const loginAsGuest = () => {
        const guestUser = { email: 'guest@example.com', isGuest: true };
        setUser(guestUser);
        localStorage.setItem('user', JSON.stringify(guestUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            register,
            loginAsGuest,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
