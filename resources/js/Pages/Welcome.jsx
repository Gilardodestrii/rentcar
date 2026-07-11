import { Head, Link } from '@inertiajs/react';

export default function Welcome({ baseDomain }) {
    return (
        <>
            <Head title="Rentivo" />
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
                <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
                    <div className="max-w-3xl space-y-6">
                        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Central Platform</p>
                        <h1 className="text-4xl font-bold leading-tight md:text-6xl">Bangun platform rental mobil multi-tenant</h1>
                        <p className="text-lg text-slate-300">Domain utama untuk landing, subscription, dan daftar tenant. Tenant akan otomatis memakai subdomain <span className="font-semibold text-white">{`namausaha.${baseDomain || 'rentivo.my.id'}`}</span>.</p>
                        <div className="flex flex-wrap gap-3 pt-4">
                            <Link href="/daftar" className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400">Daftar Tenant</Link>
                            <a href={`https://demo.${baseDomain || 'rentivo.my.id'}`} target="_blank" rel="noreferrer" className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">Lihat Demo Tenant</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
