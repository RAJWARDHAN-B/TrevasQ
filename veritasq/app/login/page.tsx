"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { sanitizeInput, secureFetch } from "@/lib/security";

export default function LoginPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Sanitize email before use
        const cleanEmail = sanitizeInput(email);
        console.log("Processing login for:", cleanEmail);

        // Mock Secure API Call
        const res = await secureFetch('/api/login', { method: 'POST' });
        const data = (await res.json()) as any;

        // Secure Session Storage
        sessionStorage.setItem('vsq_token', data.token);
        localStorage.setItem('vsq_user', JSON.stringify(data.user));

        setTimeout(() => {
            setStep(2);
            setLoading(false);
        }, 800);
    };

    const handleMFA = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Final verification
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <main className="min-h-screen pt-40 px-4 bg-[#f8fafc]">
            <Navbar />

            <div className="max-w-md mx-auto card animate-fade-in">
                <div className="text-center mb-10">
                    <h2 className="text-3xl mb-2">Secure Access</h2>
                    <p className="text-slate-500">Sign in to your VeritasQ vault</p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Work Email</label>
                            <input
                                type="email"
                                required
                                className="input-field"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Password</label>
                            <input type="password" required className="input-field" placeholder="••••••••" />
                        </div>
                        <button disabled={loading} className="btn-primary w-full">
                            {loading ? "Decrypting..." : "Continue"}
                        </button>
                        <div className="text-center text-sm text-slate-500 pt-4">
                            By continuing, you agree to our <a href="#" className="text-[var(--primary)] underline">Security Policy</a>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleMFA} className="space-y-6">
                        <div className="bg-emerald-50 p-4 rounded-lg flex gap-3 items-center mb-6 border border-emerald-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <p className="text-sm text-emerald-800">Verification code sent to •••• •••• 82</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">MFA Code</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="input-field text-center text-xl font-bold"
                                        style={{ width: "3.5rem", padding: "0.75rem 0" }}
                                    />
                                ))}
                            </div>
                        </div>
                        <button disabled={loading} className="btn-primary w-full">
                            {loading ? "Verifying..." : "Verify Identity"}
                        </button>
                        <button type="button" onClick={() => setStep(1)} className="w-full text-slate-500 text-sm hover:underline pt-2">
                            Back to Password
                        </button>
                    </form>
                )}
            </div>

            <style jsx>{`
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .block { display: block; }
        .w-full { width: 100%; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-10 { margin-bottom: 2.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .font-semibold { font-weight: 600; }
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .flex { display: flex; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .items-center { align-items: center; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .text-center { text-align: center; }
        .text-xl { font-size: 1.5rem; }
        .font-bold { font-weight: 700; }
        .pt-4 { padding-top: 1rem; }
        .pt-2 { padding-top: 0.5rem; }
      `}</style>
        </main>
    );
}
