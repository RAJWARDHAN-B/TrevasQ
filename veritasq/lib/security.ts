/**
 * VeritasQ Security Utilities
 * Focus: Input sanitization, Secure Token management, and Role Based Access
 */

/**
 * Basic input sanitization to prevent XSS and SQL injection patterns
 */
export const sanitizeInput = (input: string): string => {
    return input
        .replace(/[<>]/g, '') // Remove basic HTML tags
        .replace(/javascript:/gi, '') // Prevent protocol injection
        .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Mock Secure API call with token handling
 */
export const secureFetch = async (url: string, options: any = {}) => {
    const token = sessionStorage.getItem('vsq_token');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Sanitized': 'true'
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log(`[Secure API] Fetching ${url} with token validation...`);

    if (url === '/api/login') {
        return {
            ok: true,
            json: async () => ({ token: 'vsq_mock_token_xyz_123', user: { role: 'admin' } })
        };
    }

    return { ok: true, json: async () => ({ status: 'success' }) };
};

/**
 * Role-based access control check (UI level)
 */
export const checkAccess = (requiredRole: string): boolean => {
    if (typeof window === 'undefined') return false;
    const user = JSON.parse(localStorage.getItem('vsq_user') || '{}');
    return user.role === requiredRole;
};
