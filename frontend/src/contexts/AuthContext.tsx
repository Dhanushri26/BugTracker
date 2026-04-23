import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  team: string | null;
  userName: string | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [team, setTeamState] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage on mount
    const savedTeam = localStorage.getItem('userTeam');
    const savedUserName = localStorage.getItem('userName');
    if (savedTeam) setTeamState(savedTeam);
    if (savedUserName) setUserName(savedUserName);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, team: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          name,
          team
        }
      }
    });
    if (error) throw error;
    
    // Store team and name in localStorage
    localStorage.setItem('userTeam', team);
    localStorage.setItem('userName', name);
    setTeamState(team);
    setUserName(name);
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
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