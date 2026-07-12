import { Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Home({ featuredCars, testimonials, settings }) {
    return (
        <GuestLayout settings={settings}>
            {/* Hero Section */}
            <div className="relative pt-16 pb-32 bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <img src={settings?.hero_image ? asset('storage/' + settings.hero_image) : 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2070'} alt="Hero" className="w-full h-full object-cover opacity-40" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">{settings?.hero_title || 'Sewa Mobil Profesional'}</h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">{settings?.hero_subtitle || 'Layanan rental mobil terpercaya untuk kebutuhan bisnis maupun pribadi Anda.'}</p>
                    <div className="mt-10 flex gap-4 justify-center">
                        <Link href="/katalog" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all">Pesan Sekarang</Link>
                    </div>
                </div>
            </div>

            {/* Featured Cars Grid */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Armada Kami</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredCars.map((car) => (
                            <div key={car.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all border border-gray-100">
                                <img src={car.photo} alt={car.model} className="w-full h-40 object-cover rounded-xl mb-4" />
                                <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
                                <p className="text-blue-600 font-semibold text-xl mt-2">Rp {car.price_per_day.toLocaleString('id-ID')}</p>
                                <Link href={`/mobil/${car.id}`} className="mt-4 block w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white text-center">Lihat Detail</Link>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link href="/katalog" className="px-8 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 font-bold transition-colors">Tampilkan Armada Lainnya</Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
