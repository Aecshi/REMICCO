import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, AlertTriangle } from 'lucide-react';

// Rate limiting configuration
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_KEY = 'remicco_login_attempts';
const LOCKOUT_KEY = 'remicco_login_lockout';

interface LoginAttempt {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutTimeRemaining, setLockoutTimeRemaining] = useState(0);
  
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  // Check if already authenticated
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Check lockout status
  useEffect(() => {
    const checkLockout = () => {
      const lockoutUntil = localStorage.getItem(LOCKOUT_KEY);
      if (lockoutUntil) {
        const timeRemaining = parseInt(lockoutUntil) - Date.now();
        if (timeRemaining > 0) {
          setIsLockedOut(true);
          setLockoutTimeRemaining(Math.ceil(timeRemaining / 1000));
        } else {
          // Lockout expired, clear it
          localStorage.removeItem(LOCKOUT_KEY);
          localStorage.removeItem(RATE_LIMIT_KEY);
          setIsLockedOut(false);
        }
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const getLoginAttempts = (): LoginAttempt => {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (!stored) {
      return { count: 0, firstAttempt: Date.now(), lastAttempt: Date.now() };
    }
    return JSON.parse(stored);
  };

  const recordLoginAttempt = (success: boolean) => {
    if (success) {
      // Clear attempts on successful login
      localStorage.removeItem(RATE_LIMIT_KEY);
      localStorage.removeItem(LOCKOUT_KEY);
      return;
    }

    const attempts = getLoginAttempts();
    const now = Date.now();
    
    // Reset counter if more than 1 hour has passed
    if (now - attempts.firstAttempt > 60 * 60 * 1000) {
      attempts.count = 1;
      attempts.firstAttempt = now;
    } else {
      attempts.count++;
    }
    
    attempts.lastAttempt = now;
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(attempts));

    // Lock out if max attempts reached
    if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
      const lockoutUntil = now + LOCKOUT_DURATION;
      localStorage.setItem(LOCKOUT_KEY, lockoutUntil.toString());
      setIsLockedOut(true);
      setError(`Too many failed attempts. Account locked for 15 minutes.`);
    }
  };

  const validateInput = (email: string, password: string): string | null => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    // Password validation
    if (!password || password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    // Check for suspicious patterns (basic XSS/injection attempts)
    const suspiciousPatterns = ['<script', 'javascript:', 'onerror=', 'onclick=', 'DROP TABLE', 'SELECT *', '--'];
    const inputToCheck = email + password;
    
    for (const pattern of suspiciousPatterns) {
      if (inputToCheck.toLowerCase().includes(pattern.toLowerCase())) {
        console.warn('Suspicious input detected:', pattern);
        return 'Invalid input detected';
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLockedOut) {
      setError(`Account is locked. Please try again in ${Math.ceil(lockoutTimeRemaining / 60)} minutes.`);
      return;
    }

    setError('');
    setLoading(true);

    // Validate input
    const validationError = validateInput(email, password);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      recordLoginAttempt(false);
      return;
    }

    // Check rate limit
    const attempts = getLoginAttempts();
    if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
      setError('Too many login attempts. Please try again later.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        recordLoginAttempt(false);
        const remainingAttempts = MAX_LOGIN_ATTEMPTS - (attempts.count + 1);
        if (remainingAttempts > 0) {
          setError(`Invalid credentials. ${remainingAttempts} attempts remaining.`);
        } else {
          setError('Too many failed attempts. Account locked for 15 minutes.');
        }
        setLoading(false);
      } else {
        recordLoginAttempt(true);
        // Navigation handled by useEffect when user state updates
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
      recordLoginAttempt(false);
    }
  };

  const formatLockoutTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in to access the REMICCO admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLockedOut && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Account locked due to multiple failed login attempts.
                <br />
                Time remaining: <strong>{formatLockoutTime(lockoutTimeRemaining)}</strong>
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && !isLockedOut && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@remicco.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || isLockedOut}
                required
                autoComplete="email"
                maxLength={100}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || isLockedOut}
                required
                autoComplete="current-password"
                maxLength={100}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || isLockedOut}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Website
            </a>
          </div>

          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              🔒 Protected by rate limiting and session security
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
