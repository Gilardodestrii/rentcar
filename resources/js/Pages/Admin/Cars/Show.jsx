import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CarsShow({ car }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);

    const getStatusBadge = (status) => {
        const badges = {
            available: 'bg-green-100 text-green-700',
            rented: 'bg-blue-100 text-blue-700',
            maintenance: 'bg-yellow-100 text-yellow-700'
        };
        return badges[status] || 'bg-gray-100 text-gray-700';
    };

    const getStatusText = (status) => {
        const texts = {
            available: 'Tersedia',
            rented: 'Disewa',
            maintenance: 'Maintenance'
        };
        return texts[status] || status;
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Mobil</h2>}
        >
            <Head title={`${car.brand} ${car.model}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header with back button */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{car.brand} {car.model}</h1>
                                    <p className="text-gray-600">{car.plate_number}</p>
                                </div>
                                <div className="flex gap-3">
                                    <Link
                                        href={route('admin.cars.edit', car.id)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        Edit Mobil
                                    </Link>
                                    <Link
                                        href={route('admin.cars.index')}
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                    >
                                        Kembali
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Image */}
                                <div>
                                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                        {car.primary_photo ? (
                                            <img
                                                src={car.primary_photo}
                                                alt={`${car.brand} ${car.model}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-6">
                                    {/* Status */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-700">Status:</span>
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(car.status)}`}>
                                            {getStatusText(car.status)}
                                        </span>
                                    </div>

                                    {/* Specifications */}
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <h3 className="font-semibold text-gray-900">Spesifikasi</h3>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <span className="font-medium text-gray-700">Kategori:</span>
                                                <span className="ml-2 capitalize">{car.category}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-700">Kapasitas:</span>
                                                <span className="ml-2">{car.capacity} orang</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-700">Transmisi:</span>
                                                <span className="ml-2 capitalize">{car.transmission}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-700">Bahan Bakar:</span>
                                                <span className="ml-2 capitalize">{car.fuel_type}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-700">Tahun:</span>
                                                <span className="ml-2">{car.year}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-700">Warna:</span>
                                                <span className="ml-2 capitalize">{car.color}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Harga Sewa</h3>
                                        <div className="text-2xl font-bold text-blue-600">
                                            {formatCurrency(car.price_per_day)}
                                            <span className="text-sm font-normal text-gray-500">/hari</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {car.description && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Deskripsi</h3>
                                            <p className="text-gray-700 text-sm leading-relaxed">{car.description}</p>
                                        </div>
                                    )}

                                    {/* Features */}
                                    {car.features && car.features.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Fitur</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {car.features.map((feature, index) => (
                                                    <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Additional Photos */}
                            {car.gallery && car.gallery.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="font-semibold text-gray-900 mb-4">Galeri Foto</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {car.gallery.map((photo, index) => (
                                            <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                                <img
                                                    src={photo}
                                                    alt={`${car.brand} ${car.model} - ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
