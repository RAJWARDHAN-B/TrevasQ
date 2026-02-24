"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto text-center animate-fade-in">
        <h1 className="text-6xl md:text-7xl mb-6">
          Security You Can <span className="text-[var(--primary)]">Trust</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          VeritasQ provides military-grade encryption and secure data management for teams that prioritize privacy. Experience the next level of digital safety.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Get Started Free
          </Link>
          <Link href="#features" className="btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '0.5rem' }}>
            Learn More
          </Link>
        </div>
      </section>

      {/* Trust Messaging Section */}
      <section id="trust" className="py-20 bg-[var(--primary)] text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
          <div className="trust-card">
            <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h3>End-to-End Encryption</h3>
            <p className="opacity-80">Your data is encrypted before it even leaves your device. Only you hold the keys.</p>
          </div>
          <div className="trust-card">
            <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3>Zero Knowledge Architecture</h3>
            <p className="opacity-80">We can't see your data, even if we wanted to. Your privacy is mathematically guaranteed.</p>
          </div>
          <div className="trust-card">
            <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3>Real-time Monitoring</h3>
            <p className="opacity-80">Advanced AI monitors for suspicious activity and alerts you immediately to threats.</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl text-center mb-16">Built for Modern Security</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card flex gap-6 items-start">
            <div className="p-3 bg-emerald-50 rounded-lg text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </div>
            <div>
              <h4 className="text-xl mb-2">Secure File Exchange</h4>
              <p className="text-slate-600">Share sensitive documents securely with time-limited links and password protection.</p>
            </div>
          </div>
          <div className="card flex gap-6 items-start">
            <div className="p-3 bg-emerald-50 rounded-lg text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div>
              <h4 className="text-xl mb-2">Automated Compliance</h4>
              <p className="text-slate-600">Stay compliant with GDPR, HIPAA, and SOC2 automatically with our built-in tools.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-[var(--border)] text-center text-slate-500">
        <p>&copy; 2026 VeritasQ Secure Platforms. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .min-h-screen { min-height: 100vh; }
        .text-center { text-align: center; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .max-w-7xl { max-width: 80rem; }
        .max-w-2xl { max-width: 42rem; }
        .pt-32 { padding-top: 8rem; }
        .pb-20 { padding-bottom: 5rem; }
        .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
        .py-24 { padding-top: 6rem; padding-bottom: 6rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-10 { margin-bottom: 2.5rem; }
        .mb-16 { margin-bottom: 4rem; }
        .text-6xl { font-size: 3.75rem; line-height: 1; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .flex { display: flex; }
        .justify-center { justify-content: center; }
        .gap-4 { gap: 1rem; }
        .gap-12 { gap: 3rem; }
        .grid { display: grid; }
        .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .trust-card h3 { margin: 1.5rem 0 1rem; font-size: 1.5rem; }
        .icon-wrapper { 
          background: rgba(255,255,255,0.2); 
          width: 80px; height: 80px; 
          border-radius: 50%; 
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto;
        }
        .items-start { align-items: flex-start; }
        .gap-6 { gap: 1.5rem; }
        @media (max-width: 768px) {
          .text-6xl { font-size: 2.5rem; }
          .md\\:grid-cols-3, .md\\:grid-cols-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
