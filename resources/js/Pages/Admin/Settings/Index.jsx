import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Settings({ settings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        company_name: settings?.company_name || 'RenCar',
        hero_title: settings?.hero_title || 'Solusi Rental Mobil Terbaik',
        hero_subtitle: settings?.hero_subtitle || 'Armada lengkap, harga terjangkau, dan pelayanan profesional untuk perjalanan bisnis maupun wisata Anda.',
        phone: settings?.phone || '+62 812-3456-7890',
        email: settings?.email || 'info@rencar.id',
        address: settings?.address || 'Jakarta, Indonesia',
        whatsapp: settings?.whatsapp || '+62 812-3456-7890',
        facebook: settings?.facebook || '',
        instagram: settings?.instagram || '',
        twitter: settings?.twitter || '',
        about_us: settings?.about_us || 'Kami adalah penyedia layanan rental mobil terpercaya dengan pengalaman puluhan tahun.',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900">Pengaturan Website</h2>
            }
        >
            <Head title="Pengaturan" />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Informasi Perusahaan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Perusahaan
                            </label>
                            <input
                                type="text"
                                value={data.company_name}
                                onChange={(e) => setData('company_name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Telepon
                            </label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                WhatsApp
                            </label>
                            <input
                                type="text"
                                value={data.whatsapp}
                                onChange={(e) => setData('whatsapp', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alamat
                        </label>
                        <textarea
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                </div>

                {/* Landing Page Content */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Konten Landing Page</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Judul Hero Section
                            </label>
                            <input
                                type="text"
                                value={data.hero_title}
                                onChange={(e) => setData('hero_title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {errors.hero_title && <p className="text-red-500 text-sm mt-1">{errors.hero_title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle Hero Section
                            </label>
                            <textarea
                                value={data.hero_subtitle}
                                onChange={(e) => setData('hero_subtitle', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                            />
                            {errors.hero_subtitle && <p className="text-red-500 text-sm mt-1">{errors.hero_subtitle}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tentang Kami
                            </label>
                            <textarea
                                value={data.about_us}
                                onChange={(e) => setData('about_us', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                            />
                            {errors.about_us && <p className="text-red-500 text-sm mt-1">{errors.about_us}</p>}
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Social Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Facebook URL
                            </label>
                            <input
                                type="url"
                                value={data.facebook}
                                onChange={(e) => setData('facebook', e.target.value)}
                                placeholder="https://facebook.com/yourpage"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {errors.facebook && <p className="text-red-500 text-sm mt-1">{errors.facebook}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Instagram URL
                            </label>
                            <input
                                type="url"
                                value={data.instagram}
                                onChange={(e) => setData('instagram', e.target.value)}
                                placeholder="https://instagram.com/youraccount"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Twitter URL
                            </label>
                            <input
                                type="url"
                                value={data.twitter}
                                onChange={(e) => setData('twitter', e.target.value)}
                                placeholder="https://twitter.com/youraccount"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {errors.twitter && <p className="text-red-500 text-sm mt-1">{errors.twitter}</p>}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end">
                    {recentlySuccessful && (
                        <p className="text-green-600 text-sm mr-4">Pengaturan berhasil disimpan.</p>
                    )}
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors font-medium"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
