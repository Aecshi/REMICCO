import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, session, loading } = useAuth();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Verify session validity
    const verifySession = async () => {
      if (session) {
        // Check if session is expired
        const expiresAt = session.expires_at;
        if (expiresAt && expiresAt * 1000 < Date.now()) {
          console.warn('Session expired');
          setIsVerifying(false);
          return;
        }

        // Check if user has valid session token
        if (!session.access_token) {
          console.warn('Invalid session token');
          setIsVerifying(false);
          return;
        }
      }
      setIsVerifying(false);
    };

    verifySession();
  }, [session]);

  // Show loading state while checking auth
  if (loading || isVerifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Verifying authentication...</p>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!user || !session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check if trying to access admin routes without proper authentication
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute && !user.email) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
        <p className="text-muted-foreground text-center mb-6">
          You don't have permission to access this page.
        </p>
        <a href="/" className="text-primary hover:underline">
          Return to Home
        </a>
      </div>
    );
  }

  // Authenticated - render protected content
  return <>{children}</>;
}
