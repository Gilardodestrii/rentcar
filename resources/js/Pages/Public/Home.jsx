import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Home({ featuredCars, testimonials, settings }) {
    return (
        <GuestLayout>
            <Head title={settings.site_name} />
            
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
                {settings.hero_image && (
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{ backgroundImage: `url(${settings.hero_image})` }}
                    />
                )}
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        {settings.hero_title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8">
                        {settings.hero_subtitle}
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link 
                            href={route('public.catalog')}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                        >
                            Lihat Armada
                        </Link>
                        <Link 
                            href={route('public.booking')}
                            className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-900 font-semibold rounded-lg transition"
                        >
                            Booking Sekarang
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Armada Pilihan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCars.map((car) => (
                            <Link 
                                key={car.id}
                                href={route('public.cars.show', car.id)}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
                            >
                                <div className="aspect-video bg-gray-200 overflow-hidden">
                                    {car.photo ? (
                                        <img 
                                            src={car.photo} 
                                            alt={`${car.brand} ${car.model}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Photo
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            {car.capacity} orang
                                        </span>
                                        <span className="capitalize">{car.transmission}</span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xl font-bold text-blue-600">
                                            Rp {car.price_per_day.toLocaleString('id-ID')}/hari
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                                            Tersedia
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link 
                            href={route('public.catalog')}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Lihat Semua Mobil →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Kami?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Armada Terawat</h3>
                            <p className="text-gray-600">Semua mobil kami dalam kondisi prima dan terawat rutin</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Harga Transparan</h3>
                            <p className="text-gray-600">Tidak ada biaya tersembunyi, harga sesuai yang tertera</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Layanan 24 Jam</h3>
                            <p className="text-gray-600">Tim support siap membantu kapanpun Anda butuhkan</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            {testimonials.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Apa Kata Mereka?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow">
                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <svg 
                                                key={i}
                                                className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">{testimonial.customer_name}</span>
                                        {testimonial.car && (
                                            <span className="text-sm text-gray-500">{testimonial.car}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* About Section */}
            {settings.about_content && (
                <section className="py-16 bg-white">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">{settings.about_title}</h2>
                        <div className="prose prose-lg mx-auto text-gray-600">
                            {settings.about_content}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Siap Memulai Perjalanan Anda?</h2>
                    <p className="text-blue-100 mb-8">Hubungi kami sekarang atau langsung booking melalui website</p>
                    <div className="flex gap-4 justify-center">
                        <Link 
                            href={route('public.booking')}
                            className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition"
                        >
                            Booking Online
                        </Link>
                        {settings.company_whatsapp && (
                            <a 
                                href={`https://wa.me/${settings.company_whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
                            >
                                Hubungi via WhatsApp
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
