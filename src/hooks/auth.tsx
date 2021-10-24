import React, { createContext, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUser {
  name: string;
  login: string;
  avatar_url: string;
}

interface IAuthContextProps {
  children: React.ReactNode;
}

interface IAuthContext {
  user: IUser | null;
  loadingSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface IAuthResponse {
  token: string;
  user: IUser;
}

interface IAuthorizationResponse {
  params: {
    code?: string;
    error?: string;
  },
  type?: string;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: IAuthContextProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  
  const client_id = 'de69e7537f8a80d21727';
  const scope = 'read:user';

  async function loadUserInfo() {
    setLoadingSignIn(true);
    
    const user = await AsyncStorage.getItem('@nlw-heat:user');
    const token = await AsyncStorage.getItem('@nlw-heat:token');

    if (user && token) {
      api.defaults.headers.common['authorization'] = `Bearer ${token}`;

      setUser(JSON.parse(user) as IUser);
    }

    setLoadingSignIn(false);
  }

  useEffect(() => {
    loadUserInfo();
  }, [])

  async function signIn() {
    setLoadingSignIn(true);
    
    try {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`;
      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as IAuthorizationResponse;

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const authResponse = await api.post<IAuthResponse>('/authenticate', { code: authSessionResponse.params.code });

        const { user, token } = authResponse.data;

        api.defaults.headers.common['authorization'] = `Bearer ${token}`;
      
        await AsyncStorage.setItem('@nlw-heat:user', JSON.stringify(user));
        await AsyncStorage.setItem('@nlw-heat:token', token);
        
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSignIn(false);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@nlw-heat:user');
    await AsyncStorage.removeItem('@nlw-heat:token');

    setUser(null);
    api.defaults.headers.common['authorization'] = '';
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loadingSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth }