import { Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function CarDetail({ car, testimonials, settings }) {
    return (
        <GuestLayout settings={settings}>
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex mb-8" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="text-gray-500 hover:text-gray-700">Beranda</Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <Link href="/katalog" className="ml-1 text-gray-500 hover:text-gray-700">Katalog</Link>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-1 text-gray-700 font-medium">{car.brand} {car.model}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Images & Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Main Image */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                    {car.primary_photo ? (
                                        <img
                                            src={car.primary_photo}
                                            alt={`${car.brand} ${car.model}`}
                                            className="w-full h-96 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-96 flex items-center justify-center">
                                            <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Gallery Thumbnails */}
                            {car.photos?.length > 0 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {car.photos.map((photo, i) => (
                                        <div key={i} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
                                            <img src={photo.path} alt={`Gallery ${i + 1}`} className="w-full h-24 object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Description */}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {car.description || 'Kendaraan berkualitas dengan performa dan kenyamanan terbaik untuk perjalanan Anda.'}
                                </p>
                            </div>

                            {/* Specifications */}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Spesifikasi</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Kategori</p>
                                            <p className="font-semibold text-gray-900 capitalize">{car.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Kapasitas</p>
                                            <p className="font-semibold text-gray-900">{car.capacity} Orang</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Transmisi</p>
                                            <p className="font-semibold text-gray-900 capitalize">{car.transmission}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Plat Nomor</p>
                                            <p className="font-semibold text-gray-900">{car.plate_number}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials */}
                            {testimonials?.length > 0 && (
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ulasan Pelanggan</h2>
                                    <div className="space-y-4">
                                        {testimonials.map((testimonial, i) => (
                                            <div key={i} className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-semibold text-gray-900">{testimonial.customer_name}</p>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm">{testimonial.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Booking Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-24">
                                <div className="mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{car.brand} {car.model}</h1>
                                    <div className="flex items-center space-x-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            car.status === 'available' ? 'bg-green-100 text-green-800' :
                                            car.status === 'rented' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {car.status === 'available' ? 'Tersedia' : car.status === 'rented' ? 'Disewa' : 'Maintenance'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6 pb-6 border-b border-gray-200">
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold text-gray-900">Rp {car.price_per_day?.toLocaleString('id-ID')}</span>
                                        <span className="ml-2 text-gray-500">/hari</span>
                                    </div>
                                </div>

                                {car.status === 'available' ? (
                                    <Link
                                        href={`/booking?car_id=${car.id}`}
                                        className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Booking Sekarang
                                    </Link>
                                ) : (
                                    <button
                                        disabled
                                        className="w-full flex items-center justify-center px-6 py-3 bg-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed"
                                    >
                                        Tidak Tersedia
                                    </button>
                                )}

                                <div className="mt-6 space-y-3 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Asuransi lengkap</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Sopir berpengalaman (opsional)</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Layanan 24/7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
