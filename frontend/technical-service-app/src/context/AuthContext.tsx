import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/api/endpoints';
import { setAuthToken, getAuthToken } from '../services/api/client';
import type { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const USER_KEY = 'tech_service_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = getAuthToken();
    const u = localStorage.getItem(USER_KEY);
    
    if (t && u) {
      try {
        setToken(t);
        setUser(JSON.parse(u));
      } catch (error) {
        console.error('Error parsing user data:', error);
        setAuthToken(null);
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    setAuthToken(res.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    setToken(res.access_token);
    setUser(res.user);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const res = await authApi.register({ name, email, password });
    setAuthToken(res.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    setToken(res.access_token);
    setUser(res.user);
  };

  const signOut = () => {
    setAuthToken(null);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  };

  const refreshUser = async () => {
    try {
      const profile = await authApi.getProfile();
      localStorage.setItem(USER_KEY, JSON.stringify(profile));
      setUser(profile);
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value: AuthState = {
    user,
    token,
    role: user?.role || null,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
