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
    register: (email: string, password?: string, name?: string, address?: Omit<Address, 'id'>) => Promise<void>;
    loginAsGuest: () => void;
    logout: () => void;
    requestPasswordReset: (email: string) => Promise<void>;
    resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
    addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
    updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
    deleteAddress: (id: string) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
    changePassword: (current: string, newPass: string) => Promise<void>;
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

    const register = async (email: string, _password?: string, name?: string, address?: Omit<Address, 'id'>) => {
        // Mock register
        const mockUser: User = {
            email,
            name: name || email.split('@')[0],
            isGuest: false,
            addresses: address ? [{ ...address, id: 'addr-new' }] : []
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    };

    const requestPasswordReset = async (email: string) => {
        // Generate 3 letters + 1 number code
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomLetters = Array(3).fill(0).map(() => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
        const randomNumber = Math.floor(Math.random() * 10);
        const code = `${randomLetters}${randomNumber}`;

        console.log(`Reset code for ${email}: ${code}`);
        alert(`[SIMULACIÓN EMAIL]\nTu código de recuperación es: ${code}\n\nEste código expira en 30 minutos.`);

        // Store code in localStorage for validation
        const resetData = {
            code,
            expiresAt: Date.now() + 30 * 60 * 1000 // 30 mins
        };
        localStorage.setItem(`reset_${email}`, JSON.stringify(resetData));
    };

    const resetPassword = async (email: string, code: string, _newPassword: string) => {
        const storedData = localStorage.getItem(`reset_${email}`);
        if (!storedData) throw new Error('No se encontró solicitud de cambio de contraseña');

        const { code: storedCode, expiresAt } = JSON.parse(storedData);

        if (Date.now() > expiresAt) {
            localStorage.removeItem(`reset_${email}`);
            throw new Error('El código ha expirado');
        }

        if (code !== storedCode) {
            throw new Error('Código incorrecto');
        }

        // Mock password update
        localStorage.removeItem(`reset_${email}`);
        alert('Contraseña actualizada correctamente. Por favor inicia sesión.');
    };

    const addAddress = async (address: Omit<Address, 'id'>) => {
        if (!user) return;
        const newAddress = { ...address, id: Math.random().toString(36).substr(2, 9) };
        const updatedUser = { ...user, addresses: [...(user.addresses || []), newAddress] };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const updateAddress = async (id: string, address: Partial<Address>) => {
        if (!user || !user.addresses) return;
        const updatedAddresses = user.addresses.map(addr => addr.id === id ? { ...addr, ...address } : addr);
        const updatedUser = { ...user, addresses: updatedAddresses };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const deleteAddress = async (id: string) => {
        if (!user || !user.addresses) return;
        const updatedAddresses = user.addresses.filter(addr => addr.id !== id);
        const updatedUser = { ...user, addresses: updatedAddresses };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const updateProfile = async (data: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const changePassword = async (_current: string, _newPass: string) => {
        // Mock password change
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Contraseña actualizada correctamente');
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
            logout,
            requestPasswordReset,
            resetPassword,
            addAddress,
            updateAddress,
            deleteAddress,
            updateProfile,
            changePassword
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
