import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { api } from './api';

interface AuthCtx {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, tenantName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const saveToken = (t: string) => {
    localStorage.setItem('token', t);
    setToken(t);
  };

  const login = useCallback(async (email: string, password: string) => {
    const res = await api<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    saveToken(res.access_token);
  }, []);

  const register = useCallback(async (email: string, password: string, tenantName: string) => {
    const res = await api<{ access_token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, tenantName }),
    });
    saveToken(res.access_token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
