"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");

    return (
        <nav className="glass-nav">
            <Link href="/" className="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span style={{ fontFamily: "var(--font-crimson-pro)", fontWeight: 700, fontSize: "1.5rem" }}>
                    VeritasQ
                </span>
            </Link>

            <div className="flex items-center gap-8">
                {!isDashboard ? (
                    <>
                        <Link href="#features" className="hover:text-[var(--primary)] transition-colors">Features</Link>
                        <Link href="#trust" className="hover:text-[var(--primary)] transition-colors">Trust</Link>
                        <Link href="/login" className="btn-primary">Dashboard</Link>
                    </>
                ) : (
                    <>
                        <Link href="/dashboard" className="hover:text-[var(--primary)] transition-colors">Files</Link>
                        <Link href="/dashboard/upload" className="hover:text-[var(--primary)] transition-colors">Upload</Link>
                        <Link href="/" className="btn-primary" style={{ backgroundColor: "#64748b" }}>Logout</Link>
                    </>
                )}
            </div>

            <style jsx>{`
        nav {
          font-weight: 500;
        }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-2 { gap: 0.5rem; }
        .gap-8 { gap: 2rem; }
        @media (max-width: 768px) {
          .gap-8 { display: none; }
        }
      `}</style>
        </nav>
    );
}
