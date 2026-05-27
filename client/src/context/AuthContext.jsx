import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

const authStorageKey = 'attendance_auth';

const readStoredAuth = () => {
  try {
    const storedAuth = localStorage.getItem(authStorageKey);
    return storedAuth ? JSON.parse(storedAuth) : null;
  } catch {
    localStorage.removeItem(authStorageKey);
    return null;
  }
};

const storedAuth = readStoredAuth();

const initialState = {
  user: storedAuth?.user || null,
  token: storedAuth?.token || localStorage.getItem('attendance_token') || null
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const storedAuth = readStoredAuth();
      if (storedAuth?.token && storedAuth?.user) {
        setAuth({ user: storedAuth.user, token: storedAuth.token });
        setLoading(false);
        return;
      }

      if (!auth.token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get('/auth/me');
        setAuth((current) => ({ ...current, user: data.data }));
      } catch (error) {
        localStorage.removeItem('attendance_token');
        setAuth({ user: null, token: null });
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    const authData = data.data;
    localStorage.setItem('attendance_token', authData.token);
    localStorage.setItem(authStorageKey, JSON.stringify({ token: authData.token, user: authData }));
    setAuth({ token: authData.token, user: authData });
    toast.success('Welcome back');
    return authData;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    const authData = data.data;
    localStorage.setItem('attendance_token', authData.token);
    localStorage.setItem(authStorageKey, JSON.stringify({ token: authData.token, user: authData }));
    setAuth({ token: authData.token, user: authData });
    toast.success('Account created');
    return authData;
  };

  const logout = () => {
    localStorage.removeItem('attendance_token');
    localStorage.removeItem(authStorageKey);
    setAuth({ user: null, token: null });
    toast.success('Logged out');
  };

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      loading,
      login,
      register,
      logout,
      setAuth
    }),
    [auth.user, auth.token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
