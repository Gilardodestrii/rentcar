import { Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Home({ settings }) {
    return (
        <GuestLayout settings={settings}>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-blue-600">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                                {settings?.hero_title || 'Solusi Rental Mobil Terbaik'}
                            </h1>
                            <p className="mt-6 text-lg text-blue-100 max-w-xl">
                                {settings?.hero_subtitle || 'Armada lengkap, harga terjangkau, dan pelayanan profesional untuk perjalanan bisnis maupun wisata Anda.'}
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/katalog"
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors shadow-lg"
                                >
                                    Lihat Katalog
                                </Link>
                                <Link
                                    href="/booking"
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-400 transition-colors shadow-lg"
                                >
                                    Booking Sekarang
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:block relative">
                            <div className="aspect-w-16 aspect-h-9 bg-blue-500/20 rounded-2xl backdrop-blur-sm border border-white/20 p-8 shadow-2xl">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Armada', value: '50+', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
                                        { label: 'Pelanggan', value: '1.2k', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                                        { label: 'Rating', value: '4.9', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                                        { label: 'Kota', value: '12', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                                </svg>
                                            </div>
                                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                                            <p className="text-blue-200 text-sm">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Mengapa RenCar?</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Pelayanan Terbaik Untuk Anda
                        </p>
                    </div>
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Armada Berkualitas', desc: 'Mobil selalu dalam kondisi prima dan terawat dengan baik.' },
                            { title: 'Harga Transparan', desc: 'Tidak ada biaya tersembunyi, harga yang kami cantumkan adalah harga final.' },
                            { title: 'Layanan 24/7', desc: 'Tim support kami siap membantu Anda kapan saja dan dimana saja.' }
                        ].map((feature, i) => (
                            <div key={i} className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 -mt-1 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-xl font-bold text-gray-900 text-center">{feature.title}</h3>
                                <p className="mt-3 text-gray-500 text-center">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
