/**
 * Security utilities for input sanitization and validation
 * Protects against XSS, SQL injection, and other common attacks
 */

/**
 * Sanitize HTML string to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Sanitize text input - removes potentially dangerous characters
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  if (!input) return '';
  
  // Remove null bytes and control characters
  let sanitized = input.replace(/[\x00-\x1F\x7F]/g, '');
  
  // Trim and limit length
  sanitized = sanitized.trim().slice(0, maxLength);
  
  return sanitized;
}

/**
 * Detect suspicious patterns that might indicate an attack
 */
export function detectSuspiciousPatterns(input: string): boolean {
  if (!input) return false;
  
  const suspiciousPatterns = [
    // XSS patterns
    /<script/i,
    /javascript:/i,
    /onerror\s*=/i,
    /onclick\s*=/i,
    /onload\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    
    // SQL injection patterns (Supabase handles this, but extra layer)
    /;\s*(DROP|DELETE|INSERT|UPDATE|ALTER|CREATE)\s+/i,
    /UNION\s+SELECT/i,
    /--\s*$/,
    /\/\*.*\*\//,
    /'\s*OR\s*'1'\s*=\s*'1/i,
    
    // Path traversal
    /\.\.\//,
    /\.\.\\/,
    
    // Command injection
    /;\s*(rm|cat|ls|wget|curl|chmod|chown)/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
}

/**
 * Validate file upload name
 */
export function validateFileName(filename: string): boolean {
  if (!filename) return false;
  
  // Check for path traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return false;
  }
  
  // Check for suspicious extensions
  const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.php', '.asp', '.jsp'];
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  if (dangerousExtensions.includes(ext)) {
    return false;
  }
  
  // Check filename length
  if (filename.length > 255) {
    return false;
  }
  
  return true;
}

/**
 * Rate limiting helper using localStorage
 */
export class RateLimiter {
  private key: string;
  private maxAttempts: number;
  private windowMs: number;

  constructor(key: string, maxAttempts: number, windowMs: number) {
    this.key = key;
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  canProceed(): boolean {
    const data = this.getData();
    const now = Date.now();

    // Reset if window has passed
    if (now - data.windowStart > this.windowMs) {
      this.reset();
      return true;
    }

    return data.attempts < this.maxAttempts;
  }

  recordAttempt(): void {
    const data = this.getData();
    const now = Date.now();

    if (now - data.windowStart > this.windowMs) {
      // New window
      this.setData({ attempts: 1, windowStart: now });
    } else {
      // Increment in current window
      this.setData({ attempts: data.attempts + 1, windowStart: data.windowStart });
    }
  }

  reset(): void {
    localStorage.removeItem(this.key);
  }

  getTimeRemaining(): number {
    const data = this.getData();
    const elapsed = Date.now() - data.windowStart;
    return Math.max(0, this.windowMs - elapsed);
  }

  private getData(): { attempts: number; windowStart: number } {
    const stored = localStorage.getItem(this.key);
    if (!stored) {
      return { attempts: 0, windowStart: Date.now() };
    }
    return JSON.parse(stored);
  }

  private setData(data: { attempts: number; windowStart: number }): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate CSRF token
 */
export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  return token === storedToken;
}
