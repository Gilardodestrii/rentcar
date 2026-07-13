import { Head, Link } from '@inertiajs/react';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '@heroicons/react/24/solid';

export default function Landing() {
    const features = [
        { name: 'Multi-Tenant SaaS', description: 'Setiap pelanggan mendapatkan sistem terpisah dengan domain sendiri' },
        { name: 'Manajemen Armada', description: 'Kelola semua kendaraan dengan mudah dan terorganisir' },
        { name: 'Pemesanan Online', description: 'Sistem pemesanan otomatis dengan kalender dan pembayaran' },
        { name: 'Dashboard Analytics', description: 'Laporan penuh dengan grafik dan statistik bisnis' },
        { name: 'Mobile-Friendly', description: 'Akses dari mana saja dengan tampilan responsif' },
        { name: '24/7 Support', description: 'Tim support siap membantu kapan saja' },
    ];

    const pricingPlans = [
        {
            name: 'Starter',
            price: 'Rp 299.000',
            period: '/bulan',
            features: [
                '1 Domain Tenant',
                '10 Kendaraan',
                '100 Pemesanan/Bulan',
                'Dashboard Basic',
                'Email Support',
            ],
            excluded: ['Custom Domain', 'API Access', 'Priority Support'],
            popular: false,
            buttonText: 'Mulai Sekarang',
            buttonColor: 'bg-gray-600 hover:bg-gray-700',
        },
        {
            name: 'Professional',
            price: 'Rp 799.000',
            period: '/bulan',
            features: [
                '5 Domain Tenant',
                '50 Kendaraan',
                '1000 Pemesanan/Bulan',
                'Dashboard Advanced',
                'Email & Chat Support',
                'Custom Domain',
            ],
            excluded: ['API Access', 'Priority Support'],
            popular: true,
            buttonText: 'Pilih Paket',
            buttonColor: 'bg-blue-600 hover:bg-blue-700',
        },
        {
            name: 'Enterprise',
            price: 'Rp 1.999.000',
            period: '/bulan',
            features: [
                'Unlimited Domain Tenant',
                'Unlimited Kendaraan',
                'Unlimited Pemesanan',
                'Dashboard Full Feature',
                'Email, Chat & Phone Support',
                'Custom Domain',
                'API Access',
                'Priority Support',
            ],
            excluded: [],
            popular: false,
            buttonText: 'Kontak Sales',
            buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
        },
    ];

    const testimonials = [
        {
            quote: '"Sistemnya sangat mudah digunakan dan membantu bisnis rental kami tumbuh 300% dalam 6 bulan."',
            name: 'Budi Santoso',
            title: 'Pemilik RentCar Jakarta',
            rating: 5,
        },
        {
            quote: '"Support timnya sangat responsif. Masalah kami selalu terselesaikan dalam hitungan jam."',
            name: 'Siti Aisyah',
            title: 'Manager CV. Transportasi Sejahtera',
            rating: 5,
        },
        {
            quote: '"Fitur manajemen armada dan laporan keuangannya sangat lengkap. Sangat direkomendasikan!"',
            name: 'Agus Wibowo',
            title: 'Direktur PT. Sewa Mobil Nusantara',
            rating: 5,
        },
    ];

    return (
        <>
            <Head title="Rentivo - Sistem Manajemen Rental Mobil SaaS" />
            
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Kelola Bisnis Rental Mobil 
                            <span className="text-blue-600">Lebih Mudah</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Rentivo adalah solusi SaaS (Software as a Service) untuk bisnis rental mobil Anda. 
                            Dengan sistem multi-tenant, setiap pelanggan mendapatkan akses terpisah dengan fitur lengkap.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="#pricing"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
                            >
                                Lihat Paket Harga
                            </Link>
                            <Link
                                href="#demo"
                                className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition"
                            >
                                Coba Demo Gratis
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Unggulan Rentivo</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Semua fitur yang Anda butuhkan untuk mengelola bisnis rental mobil secara profesional
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilih Paket Subscription</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Mulai dari Rp 299.000 per bulan. Tidak ada biaya tersembunyi.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-8 shadow-lg ${plan.popular ? 'ring-2 ring-blue-600' : ''}`}
                            >
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    {plan.popular && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                                            Populer
                                        </span>
                                    )}
                                    <div className="my-6">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-lg text-gray-500">{plan.period}</span>
                                    </div>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                    {plan.excluded.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <XCircleIcon className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="text-gray-400">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="#"
                                    className={`w-full block text-center py-3 px-6 rounded-lg font-medium text-white transition ${plan.buttonColor}`}
                                >
                                    {plan.buttonText}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa Kata Pelanggan Kami?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Ribuan bisnis rental mobil sudah percaya menggunakan Rentivo
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-8">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Siap Meningkatkan Bisnis Rental Anda?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Daftar sekarang dan dapatkan akses penuh ke semua fitur Rentivo selama 7 hari gratis!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition"
                        >
                            Daftar Sekarang
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition"
                        >
                            Hubungi Sales
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Rentivo</h3>
                            <p className="text-gray-400 mb-4">
                                Solusi SaaS untuk bisnis rental mobil terpercaya di Indonesia.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">WhatsApp</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c.003 5.45-4.437 9.884-9.885 9.884m-8.413-18.297a1.162 1.162 0 01.832 1.842 1.162 1.162 0 01-.832-1.842m8.417 18.297a1.162 1.162 0 01-.832-1.842 1.162 1.162 0 01.832 1.842" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Produk</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Fitur</a></li>
                                <li><a href="#pricing" className="text-gray-400 hover:text-white">Harga</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Demo</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Perusahaan</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Tentang Kami</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Kontak</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Bantuan</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Dokumentasi</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Rentivo. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
