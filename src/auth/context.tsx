import { createContext, useContext, useState, ReactNode } from 'react';
import type { User, AuthState } from './types';

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: false,
  });

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    // Mock login - replace with real auth
    setTimeout(() => {
      setAuthState({
        user: { id: '1', email, name: 'User', role: 'admin' },
        isAuthenticated: true,
        loading: false,
      });
    }, 1000);
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
