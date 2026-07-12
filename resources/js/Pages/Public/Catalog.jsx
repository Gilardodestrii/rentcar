import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Catalog({ cars, filters, settings }) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [category, setCategory] = useState(filters?.category || '');
    const [transmission, setTransmission] = useState(filters?.transmission || '');
    const [sortBy, setSortBy] = useState(filters?.sort_by || 'latest');

    const handleFilter = () => {
        router.get(route('public.catalog'), {
            search: searchTerm,
            category: category,
            transmission: transmission,
            sort_by: sortBy,
        }, { preserveState: true, replace: true });
    };

    const getStatusBadge = (status) => {
        const badges = {
            available: { bg: 'bg-green-100', text: 'text-green-800', label: 'Tersedia' },
            rented: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Disewa' },
            maintenance: { bg: 'bg-red-100', text: 'text-red-800', label: 'Maintenance' },
        };
        const badge = badges[status] || badges.available;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                {badge.label}
            </span>
        );
    };

    return (
        <GuestLayout settings={settings}>
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900">Katalog Armada</h1>
                        <p className="mt-4 text-lg text-gray-600">Pilih mobil yang sesuai dengan kebutuhan perjalanan Anda</p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cari Mobil</label>
                                <input
                                    type="text"
                                    placeholder="Cari brand/model..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                >
                                    <option value="">Semua Kategori</option>
                                    <option value="sedan">Sedan</option>
                                    <option value="suv">SUV</option>
                                    <option value="mpv">MPV</option>
                                    <option value="hatchback">Hatchback</option>
                                    <option value="luxury">Luxury</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Transmisi</label>
                                <select
                                    value={transmission}
                                    onChange={(e) => setTransmission(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                >
                                    <option value="">Semua Transmisi</option>
                                    <option value="manual">Manual</option>
                                    <option value="automatic">Automatic</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                >
                                    <option value="latest">Terbaru</option>
                                    <option value="price_low">Harga: Rendah - Tinggi</option>
                                    <option value="price_high">Harga: Tinggi - Rendah</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleFilter}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Terapkan Filter
                            </button>
                        </div>
                    </div>

                    {/* Cars Grid */}
                    {cars?.data?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cars.data.map((car) => (
                                <div key={car.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
                                    {/* Car Image */}
                                    <div className="relative h-48 bg-gray-200">
                                        {car.photo ? (
                                            <img
                                                src={car.photo}
                                                alt={`${car.brand} ${car.model}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3">
                                            {getStatusBadge(car.status)}
                                        </div>
                                    </div>

                                    {/* Car Info */}
                                    <div className="p-5">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{car.brand} {car.model}</h3>
                                        <p className="text-sm text-gray-500 mb-4 capitalize">{car.category}</p>

                                        {/* Specs */}
                                        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                                <span>{car.capacity} Orang</span>
                                            </div>
                                            <div className="flex items-center space-x-1 capitalize">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                </svg>
                                                <span>{car.transmission}</span>
                                            </div>
                                        </div>

                                        {/* Price & Action */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900">Rp {car.price_per_day?.toLocaleString('id-ID')}</p>
                                                <p className="text-xs text-gray-500">per hari</p>
                                            </div>
                                            <Link
                                                href={`/mobil/${car.id}`}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
                                            >
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Tidak ada mobil ditemukan</h3>
                            <p className="mt-1 text-sm text-gray-500">Coba ubah filter pencarian Anda</p>
                        </div>
                    )}

                    {/* Pagination (jika ada) */}
                    {cars?.links && (
                        <div className="mt-8 flex justify-center">
                            <nav className="flex space-x-2">
                                {cars.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg transition-colors ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
