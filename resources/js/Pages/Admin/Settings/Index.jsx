import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Settings({ settings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        site_name: settings?.site_name || '',
        site_tagline: settings?.site_tagline || '',
        site_logo: null,
        hero_title: settings?.hero_title || '',
        hero_subtitle: settings?.hero_subtitle || '',
        hero_image: null,
        about_title: settings?.about_title || '',
        about_content: settings?.about_content || '',
        company_phone: settings?.company_phone || '',
        company_email: settings?.company_email || '',
        company_address: settings?.company_address || '',
        company_whatsapp: settings?.company_whatsapp || '',
        social_facebook: settings?.social_facebook || '',
        social_instagram: settings?.social_instagram || '',
        social_twitter: settings?.social_twitter || '',
        _method: 'put' // Fake put for multipart
    });

    const [previews, setPreviews] = useState({
        site_logo: settings?.site_logo_url || null,
        hero_image: settings?.hero_image_url || null,
    });

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setData(field, file);
            setPreviews({ ...previews, [field]: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            forceFormData: true,
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-900">Pengaturan Website</h2>}
        >
            <Head title="Pengaturan" />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto pb-12">
                
                {/* BRAND & LOGO */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Identitas Website</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Website / Perusahaan</label>
                                <input type="text" value={data.site_name} onChange={e => setData('site_name', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                                {errors.site_name && <p className="text-red-500 text-sm mt-1">{errors.site_name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slogan / Tagline</label>
                                <input type="text" value={data.site_tagline} onChange={e => setData('site_tagline', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                                {errors.site_tagline && <p className="text-red-500 text-sm mt-1">{errors.site_tagline}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Logo Website</label>
                            <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'site_logo')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            {errors.site_logo && <p className="text-red-500 text-sm mt-1">{errors.site_logo}</p>}
                            {previews.site_logo && (
                                <div className="mt-4 p-4 border rounded-lg bg-gray-50 flex justify-center">
                                    <img src={previews.site_logo} alt="Logo" className="max-h-16 object-contain" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* LANDING PAGE HERO */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Banner Utama (Hero Section)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Utama</label>
                                <input type="text" value={data.hero_title} onChange={e => setData('hero_title', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                                {errors.hero_title && <p className="text-red-500 text-sm mt-1">{errors.hero_title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Judul (Deskripsi Singkat)</label>
                                <textarea value={data.hero_subtitle} onChange={e => setData('hero_subtitle', e.target.value)} rows="3" className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
                                {errors.hero_subtitle && <p className="text-red-500 text-sm mt-1">{errors.hero_subtitle}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Banner / Background</label>
                            <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'hero_image')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            {errors.hero_image && <p className="text-red-500 text-sm mt-1">{errors.hero_image}</p>}
                            {previews.hero_image && (
                                <div className="mt-4 aspect-video rounded-lg overflow-hidden border bg-gray-100">
                                    <img src={previews.hero_image} alt="Hero Background" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* KONTAK & ALAMAT */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Kontak & Alamat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" value={data.company_email} onChange={e => setData('company_email', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-blue-500" />
                            {errors.company_email && <p className="text-red-500 text-sm mt-1">{errors.company_email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                            <input type="text" value={data.company_whatsapp} onChange={e => setData('company_whatsapp', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-blue-500" />
                            {errors.company_whatsapp && <p className="text-red-500 text-sm mt-1">{errors.company_whatsapp}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                            <textarea value={data.company_address} onChange={e => setData('company_address', e.target.value)} rows="2" className="w-full rounded-lg border-gray-300 focus:ring-blue-500"></textarea>
                        </div>
                    </div>
                </div>

                {/* TENTANG KAMI */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Tentang Kami</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Tentang Kami</label>
                            <input type="text" value={data.about_title} onChange={e => setData('about_title', e.target.value)} className="w-full rounded-lg border-gray-300 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Konten Tentang Kami</label>
                            <textarea value={data.about_content} onChange={e => setData('about_content', e.target.value)} rows="5" className="w-full rounded-lg border-gray-300 focus:ring-blue-500"></textarea>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end sticky bottom-6 bg-white/90 p-4 backdrop-blur rounded-xl shadow-lg border border-gray-100">
                    {recentlySuccessful && <span className="text-green-600 mr-4 font-medium">✓ Tersimpan</span>}
                    <button type="submit" disabled={processing} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50">
                        {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
