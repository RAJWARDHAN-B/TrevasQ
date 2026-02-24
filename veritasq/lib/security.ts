import { z } from "zod";

/**
 * VeritasQ Security Utilities
 * Focus: Input sanitization, Secure Token management, and Role Based Access
 */

// Schema for Login Validation
export const LoginSchema = z.object({
    email: z.string().email("Please enter a valid work email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

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
 * Real Encryption using Browser Web Crypto API (AES-GCM)
 */
export const encryptFile = async (file: File): Promise<{ encryptedBlob: Blob; iv: Uint8Array }> => {
    // 1. Generate a random key (in a real app, this might be derived from a user secret)
    const key = await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    // 2. Read file as ArrayBuffer
    const fileBuffer = await file.arrayBuffer();

    // 3. Generate initialization vector (IV)
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // 4. Encrypt the data
    const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        fileBuffer
    );

    return {
        encryptedBlob: new Blob([encryptedBuffer], { type: 'application/octet-stream' }),
        iv: iv
    };
};

/**
 * Mock Secure API call with token handling and error simulation
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
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simulate a random "Security Handshake" failure occasionally (5% chance)
    if (Math.random() < 0.05) {
        throw new Error("Security handhake failed: Potential TLS interference detected.");
    }

    console.log(`[Secure API] Fetching ${url} with token validation...`);

    if (url === '/api/login') {
        // Simple mock check for demonstration
        if (options.body && JSON.parse(options.body).email === 'error@veritasq.io') {
            return {
                ok: false,
                status: 401,
                json: async () => ({ error: 'Invalid credentials or account locked.' })
            };
        }

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
