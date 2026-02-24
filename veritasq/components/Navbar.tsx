"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");

    return (
        <nav className="glass-nav flex justify-between items-center px-6 py-3 whitespace-nowrap">
            <Link href="/" className="flex items-center gap-3 shrink-0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-xl md:text-2xl font-bold font-[var(--font-crimson-pro)] text-slate-900">
                    VeritasQ
                </span>
            </Link>

            <div className="flex items-center gap-6 md:gap-10">
                {!isDashboard ? (
                    <>
                        <Link href="#features" className="text-slate-600 hover:text-[var(--primary)] transition-colors font-medium hidden sm:block">Features</Link>
                        <Link href="#trust" className="text-slate-600 hover:text-[var(--primary)] transition-colors font-medium hidden sm:block">Trust</Link>
                        <Link href="/login" className="btn-primary hover:shadow-lg transition-all px-8 py-2">Dashboard</Link>
                    </>
                ) : (
                    <>
                        <Link href="/dashboard" className="text-slate-600 hover:text-[var(--primary)] transition-colors font-semibold text-sm md:text-base">Files</Link>
                        <Link href="/dashboard/upload" className="text-slate-600 hover:text-[var(--primary)] transition-colors font-semibold text-sm md:text-base">Upload</Link>
                        <Link href="/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-md active:scale-95">Logout</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
