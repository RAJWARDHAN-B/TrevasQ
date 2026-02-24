import Navbar from "@/components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div style={{ paddingTop: '200px', paddingBottom: '3rem' }}>
                {children}
            </div>
        </div>
    );
}
