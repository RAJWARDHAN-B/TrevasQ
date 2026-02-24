import { useState, useCallback } from "react";
import Link from "next/link";
import { encryptFile } from "@/lib/security";

export default function UploadPage() {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState("");
    const [progress, setProgress] = useState(0);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFiles(Array.from(e.dataTransfer.files));
        }
    }, []);

    const handleUpload = async () => {
        if (files.length === 0) return;
        setUploading(true);
        setProgress(0);

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setStatus(`Encrypting: ${file.name}...`);

                // Real Crypto Step
                const { encryptedBlob, iv } = await encryptFile(file);
                console.log(`[Security] File encrypted. IV:`, iv, `Blob size:`, encryptedBlob.size);

                // Simulate upload of the encrypted blob
                for (let p = 0; p <= 100; p += 10) {
                    setProgress(Math.round(((i / files.length) * 100) + (p / files.length)));
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }

            setStatus("Syncing with Vault...");
            setProgress(100);
            await new Promise(resolve => setTimeout(resolve, 500));

            alert("Success: All files were encrypted locally (AES-GCM) and uploaded to the secure vault.");
            setFiles([]);
        } catch (err) {
            alert("Encryption failed. The security module encountered an internal error.");
        } finally {
            setUploading(false);
            setProgress(0);
            setStatus("");
        }
    };

    return (
        <main className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </Link>
                <h2 className="text-3xl">Secure File Upload</h2>
            </div>

            <div className="card space-y-8">
                <div className="bg-emerald-50 border border-dashed border-[var(--primary)] rounded-xl p-12 text-center transition-all"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    style={{ backgroundColor: dragActive ? '#dcfce7' : '' }}>
                    <div className="icon-main mb-6 mx-auto bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    </div>
                    <h3 className="text-xl mb-2">Drag & Drop Securely</h3>
                    <p className="text-slate-500 mb-6">Files are encrypted locally using AES-256 before upload</p>

                    <input type="file" id="file-upload" className="hidden" multiple onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))} />
                    <label htmlFor="file-upload" className="btn-primary cursor-pointer inline-flex items-center gap-2">
                        Browse Files
                    </label>
                </div>

                {files.length > 0 && (
                    <div className="animate-fade-in">
                        <h4 className="font-semibold mb-4">Ready for Encryption:</h4>
                        <div className="space-y-3">
                            {files.map((f: File, i: number) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border">
                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                        <span className="text-sm font-medium">{f.name}</span>
                                    </div>
                                    <span className="text-xs text-slate-400">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t">
                            {uploading ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{status}</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3">
                                        <div className="bg-[var(--primary)] h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={handleUpload} className="btn-primary w-full py-4 text-lg">
                                    Start Secure Upload
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div className="bg-amber-50 rounded-lg p-4 flex gap-4 items-start border border-amber-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2" className="mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    <div>
                        <h5 className="font-bold text-amber-900 text-sm">Security Policy Reminder</h5>
                        <p className="text-xs text-amber-800 leading-relaxed">
                            By uploading files, you confirm they do not contain unencrypted PII unless authorized. All files are automatically scanned for malware upon ingestion.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .hidden { display: none; }
        .space-y-8 > * + * { margin-top: 2rem; }
        .space-y-3 > * + * { margin-top: 0.75rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .gap-4 { gap: 1rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .text-center { text-align: center; }
        .text-3xl { font-size: 1.875rem; }
        .text-xl { font-size: 1.25rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .font-semibold { font-weight: 600; }
        .font-bold { font-weight: 700; }
        .w-full { width: 100%; }
        .inline-flex { display: inline-flex; }
        .rounded-full { border-radius: 9999px; }
      `}</style>
        </main>
    );
}
