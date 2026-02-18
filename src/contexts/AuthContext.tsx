import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session timeout: 8 hours (in milliseconds)
const SESSION_TIMEOUT = 8 * 60 * 60 * 1000;
// Session refresh interval: every 30 minutes
const SESSION_REFRESH_INTERVAL = 30 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Refresh session token
  const refreshSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setLastActivity(Date.now());
      }
    } catch (error) {
      console.error('Session refresh failed:', error);
      await signOut();
    }
  }, []);

  // Check for session timeout
  const checkSessionTimeout = useCallback(() => {
    if (user && Date.now() - lastActivity > SESSION_TIMEOUT) {
      console.warn('Session timeout due to inactivity');
      signOut();
    }
  }, [user, lastActivity]);

  // Track user activity
  const updateActivity = useCallback(() => {
    if (user) {
      setLastActivity(Date.now());
    }
  }, [user]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session) {
        setLastActivity(Date.now());
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (session) {
          setLastActivity(Date.now());
        }

        // Handle token expired or invalid
        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        } else if (event === 'SIGNED_OUT') {
          setLastActivity(0);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Auto-refresh session periodically
  useEffect(() => {
    if (!user) return;

    const refreshInterval = setInterval(() => {
      refreshSession();
    }, SESSION_REFRESH_INTERVAL);

    return () => clearInterval(refreshInterval);
  }, [user, refreshSession]);

  // Check for timeout periodically
  useEffect(() => {
    if (!user) return;

    const timeoutCheck = setInterval(() => {
      checkSessionTimeout();
    }, 60000); // Check every minute

    return () => clearInterval(timeoutCheck);
  }, [user, checkSessionTimeout]);

  // Track user activity
  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }, [user, updateActivity]);

  const signIn = async (email: string, password: string) => {
    try {
      // Sanitize email input
      const sanitizedEmail = email.trim().toLowerCase();
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedEmail)) {
        return { error: new Error('Invalid email format') };
      }

      // Validate password length
      if (password.length < 6) {
        return { error: new Error('Invalid credentials') };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password,
      });

      if (error) {
        // Generic error message to prevent user enumeration
        return { error: new Error('Invalid credentials') };
      }

      if (data.session) {
        setLastActivity(Date.now());
      }

      return { error: null };
    } catch (error) {
      return { error: new Error('Authentication failed') };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setLastActivity(0);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut, refreshSession }}>
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
