import React, { createContext, useContext, useEffect, useState } from 'react';
import { LocalUser } from '../lib/supabase';
import { authAPI } from '../lib/api';

interface AuthContextType {
  user: LocalUser | null;
  loading: boolean;
  team: string | null;
  userName: string | null;
  token: string | null;
  signUp: (email: string, password: string, name: string, team: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setTeam: (team: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [team, setTeamState] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage on mount
    const savedTeam = localStorage.getItem('userTeam');
    const savedUserName = localStorage.getItem('userName');
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');

    if (savedTeam) setTeamState(savedTeam);
    if (savedUserName) setUserName(savedUserName);
    if (savedToken) setToken(savedToken);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string, team: string) => {
    try {
      const response = await authAPI.signup(email, password, name, team);
      localStorage.setItem('userTeam', team);
      localStorage.setItem('userName', name);
      localStorage.setItem('user', JSON.stringify(response.user));
      setTeamState(team);
      setUserName(name);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userTeam', response.user.team);
      localStorage.setItem('userName', response.user.name);
      localStorage.setItem('user', JSON.stringify(response.user));
      setToken(response.token);
      setTeamState(response.user.team);
      setUserName(response.user.name);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear localStorage
    localStorage.removeItem('userTeam');
    localStorage.removeItem('userName');
    setTeamState(null);
    setUserName(null);
  };

  const setTeam = (newTeam: string) => {
    setTeamState(newTeam);
    localStorage.setItem('userTeam', newTeam);
  };

  const value = {
    user,
    loading,
    team,
    userName,
    signUp,
    signIn,
    signOut,
    setTeam,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}