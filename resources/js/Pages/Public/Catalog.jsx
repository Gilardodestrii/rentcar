import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Catalog({ cars, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [transmission, setTransmission] = useState(filters.transmission || '');
    const [sortBy, setSortBy] = useState(filters.sort_by || 'latest');

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        if (transmission) params.append('transmission', transmission);
        if (sortBy) params.append('sort_by', sortBy);
        window.location.href = `${route('public.catalog')}?${params.toString()}`;
    };

    return (
        <GuestLayout>
            <Head title="Katalog Armada" />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Katalog Armada</h1>

                {/* Filters */}
                <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cari</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Merk atau model..."
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Semua</option>
                                <option value="sedan">Sedan</option>
                                <option value="suv">SUV</option>
                                <option value="mpv">MPV</option>
                                <option value="hatchback">Hatchback</option>
                                <option value="luxury">Luxury</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Transmisi</label>
                            <select
                                value={transmission}
                                onChange={(e) => setTransmission(e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Semua</option>
                                <option value="automatic">Automatic</option>
                                <option value="manual">Manual</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Urutkan</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="latest">Terbaru</option>
                                <option value="price_low">Harga Terendah</option>
                                <option value="price_high">Harga Tertinggi</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        >
                            Terapkan Filter
                        </button>
                    </div>
                </form>

                {/* Cars Grid */}
                {cars.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cars.data.map((car) => (
                                <Link
                                    key={car.id}
                                    href={route('public.cars.show', car.id)}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group"
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
                                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                                            <span className="capitalize px-2 py-1 bg-gray-100 rounded">{car.category}</span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                {car.capacity}
                                            </span>
                                            <span className="capitalize">{car.transmission}</span>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-xl font-bold text-blue-600">
                                                Rp {car.price_per_day.toLocaleString('id-ID')}
                                                <span className="text-sm font-normal text-gray-500">/hari</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {cars.links && cars.links.length > 3 && (
                            <div className="mt-8 flex justify-center gap-2">
                                {cars.links.map((link, i) => (
                                    <button
                                        key={i}
                                        disabled={!link.url}
                                        onClick={() => link.url && (window.location.href = link.url)}
                                        className={`px-4 py-2 rounded-lg transition ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-500 text-lg">Tidak ada mobil yang ditemukan</p>
                        <Link href={route('public.catalog')} className="text-blue-600 hover:underline mt-2 inline-block">
                            Reset Filter
                        </Link>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
