import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserCreate, AuthContextType } from '../types';
import { authService } from "../services/authService";
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = authService.getToken();
            if (storedToken) {
                try {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                    setToken(storedToken);
                } catch  {
                    authService.removeToken();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            setLoading(true);
            const tokenData = await authService.login({
                username,
                password
            });
            authService.setToken(tokenData.access_token);
            setToken(tokenData.access_token);

            const userData = await authService.getCurrentUser();
            setUser(userData);

            toast.success('Login realizado com sucesso!');
        } catch (error: any) {
            const message = error.response?.data?.detail || 'Erro ao fazer login';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData: UserCreate) => {
        try {
            setLoading(true);
            await authService.register(userData);
            toast.success('Conta criada com sucesso! Faça login para continuar.');
        } catch (error: any) {
            const message = error.response?.data?.detail || 'Erro ao criar conta';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.removeToken();
        setUser(null);
        setToken(null);
        toast.success('Logout realizado com sucesso!');
    };

    const value: AuthContextType = {
        user,
        token,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};