"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { checkAccess } from "@/lib/security";

export default function DashboardPage() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(checkAccess('admin'));
    }, []);

    const [files] = useState([
        { name: "financial_report_2025.pdf", size: "2.4 MB", date: "2026-02-15", status: "Secure" },
        { name: "product_roadmap_INTERNAL.docx", size: "1.1 MB", date: "2026-02-20", status: "Secure" },
        { name: "user_data_export.csv", size: "15.8 MB", date: "2026-02-23", status: "Scanning" },
        { name: "cloud_architecture.png", size: "4.2 MB", date: "2026-02-10", status: "Secure" },
    ]);

    const [auditLogs] = useState([
        { action: "Login Success", user: "You", ip: "192.168.1.45", time: "2 min ago" },
        { action: "File Upload", user: "You", ip: "192.168.1.45", time: "1 hour ago" },
        { action: "Security Scan", user: "System", ip: "-", time: "5 hours ago" },
        { action: "MFA Enabled", user: "You", ip: "192.168.1.45", time: "1 day ago" },
    ]);

    return (
        <main className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
            {/* Sidebar / Status */}
            <div className="lg:col-span-1 space-y-6">
                <div className="card">
                    <h3 className="text-xl mb-4">Security Overview</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">Global Protection</span>
                            <span className="badge badge-success">Active</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">Vault Status</span>
                            <span className="text-[var(--primary)] font-bold">Locked (AES-256)</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">MFA Status</span>
                            <span className="badge badge-success">Verified</span>
                        </div>
                        {isAdmin && (
                            <div className="flex justify-between items-center bg-purple-50 p-2 rounded border border-purple-100 mt-2">
                                <span className="text-purple-700 text-xs font-bold uppercase">Admin Access</span>
                                <span className="text-[10px] text-purple-600">Full Permissions</span>
                            </div>
                        )}
                        <div className="pt-4 border-t">
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                                <div className="bg-[var(--primary)] h-2 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <p className="text-xs text-slate-500">Vault Security Score: 92%</p>
                        </div>
                    </div>
                </div>

                <div className="card bg-emerald-900 text-white">
                    <h3 className="text-lg mb-2">Pro Tip</h3>
                    <p className="text-sm opacity-80 leading-relaxed">
                        Always verify the URL matches <code className="bg-emerald-800 px-1 rounded">veritasq.io</code> before entering credentials.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                <div className="card">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl">Secure Files</h3>
                        <Link href="/dashboard/upload" className="btn-primary text-sm">
                            + Upload File
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b text-slate-400 text-sm">
                                    <th className="pb-4 font-normal">Name</th>
                                    <th className="pb-4 font-normal">Size</th>
                                    <th className="pb-4 font-normal text-right">Added</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {files.map((file, i) => (
                                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                                <span className="font-medium">{file.name}</span>
                                                {file.status === "Scanning" && <span className="badge badge-warning text-[10px]">Scanning</span>}
                                            </div>
                                        </td>
                                        <td className="py-4 text-slate-500">{file.size}</td>
                                        <td className="py-4 text-right text-slate-400 text-sm">{file.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-xl mb-6">Security Audit Log</h3>
                    <div className="space-y-4">
                        {auditLogs.map((log, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50">
                                <div className="flex gap-4 items-center">
                                    <div className={`w-2 h-2 rounded-full ${log.action.includes('Success') ? 'bg-emerald-400' : 'bg-slate-300'}`}></div>
                                    <div>
                                        <p className="text-sm font-medium">{log.action}</p>
                                        <p className="text-xs text-slate-400">IP: {log.ip}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">{log.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .space-y-8 > * + * { margin-top: 2rem; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .w-full { width: 100%; }
        .grid { display: grid; }
        .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .lg\\:col-span-1 { grid-column: span 1 / span 1; }
        .lg\\:col-span-2 { grid-column: span 2 / span 2; }
        .gap-8 { gap: 2rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
        .font-medium { font-weight: 500; }
        .font-bold { font-weight: 700; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        @media (max-width: 1024px) {
          .lg\\:grid-cols-3 { grid-template-columns: 1fr; }
        }
      `}</style>
        </main>
    );
}
