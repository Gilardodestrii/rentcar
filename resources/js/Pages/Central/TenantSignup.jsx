import { Head, useForm } from '@inertiajs/react';

export default function TenantSignup({ baseDomain }) {
    const { data, setData, post, processing, errors } = useForm({
        company_name: '',
        slug: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    return (
        <>
            <Head title="Daftar Tenant" />
            <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
                <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <h1 className="text-2xl font-bold">Daftar sebagai tenant</h1>
                    <p className="mt-2 text-sm text-slate-600">Subdomain akan dibuat otomatis: <span className="font-semibold">{data.slug || 'namatoko'}.{baseDomain || 'rentivo.my.id'}</span></p>
                    <form onSubmit={(e) => { e.preventDefault(); post('/daftar'); }} className="mt-6 space-y-4">
                        <input className="w-full rounded-lg border p-3" placeholder="Nama perusahaan" value={data.company_name} onChange={(e)=>setData('company_name', e.target.value)} />
                        {errors.company_name && <div className="text-sm text-red-600">{errors.company_name}</div>}
                        <input className="w-full rounded-lg border p-3" placeholder="Slug subdomain: contoh rentaljaya" value={data.slug} onChange={(e)=>setData('slug', e.target.value)} />
                        {errors.slug && <div className="text-sm text-red-600">{errors.slug}</div>}
                        <input className="w-full rounded-lg border p-3" placeholder="Nama admin" value={data.name} onChange={(e)=>setData('name', e.target.value)} />
                        {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
                        <input className="w-full rounded-lg border p-3" type="email" placeholder="Email admin" value={data.email} onChange={(e)=>setData('email', e.target.value)} />
                        {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}
                        <input className="w-full rounded-lg border p-3" type="password" placeholder="Password" value={data.password} onChange={(e)=>setData('password', e.target.value)} />
                        <input className="w-full rounded-lg border p-3" type="password" placeholder="Konfirmasi password" value={data.password_confirmation} onChange={(e)=>setData('password_confirmation', e.target.value)} />
                        {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}
                        <button disabled={processing} className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-50">Buat tenant</button>
                    </form>
                </div>
            </div>
        </>
    );
}
