import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CarsIndex({ cars, filters }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);

    const handleDelete = (car) => {
        if (confirm(`Hapus ${car.brand} ${car.model}?`)) {
            router.delete(route('admin.cars.destroy', car.id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Armada" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Manajemen Armada</h1>
                        <Link
                            href={route('admin.cars.create')}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        >
                            + Tambah Mobil
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <form method="get" className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters.search || ''}
                                placeholder="Cari merk/model/plat..."
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <select
                                name="status"
                                defaultValue={filters.status || ''}
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="available">Tersedia</option>
                                <option value="rented">Disewa</option>
                                <option value="maintenance">Servis</option>
                            </select>
                            <select
                                name="category"
                                defaultValue={filters.category || ''}
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Semua Kategori</option>
                                <option value="sedan">Sedan</option>
                                <option value="suv">SUV</option>
                                <option value="mpv">MPV</option>
                                <option value="hatchback">Hatchback</option>
                                <option value="luxury">Luxury</option>
                            </select>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition"
                            >
                                Filter
                            </button>
                        </form>
                    </div>

                    {/* Cars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.data.map((car) => (
                            <div key={car.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="aspect-video bg-gray-200">
                                    {car.primary_photo ? (
                                        <img
                                            src={car.primary_photo}
                                            alt={`${car.brand} ${car.model}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Photo
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{car.brand} {car.model}</h3>
                                            <p className="text-sm text-gray-600">{car.plate_number}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                            car.status === 'available' ? 'bg-green-100 text-green-700' :
                                            car.status === 'rented' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {car.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                                        <span className="capitalize">{car.category}</span>
                                        <span>{car.capacity} seat</span>
                                        <span className="capitalize">{car.transmission}</span>
                                    </div>

                                    <div className="text-xl font-bold text-blue-600 mb-4">
                                        {formatCurrency(car.price_per_day)}
                                        <span className="text-sm font-normal text-gray-500">/hari</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.cars.show', car.id)}
                                            className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center rounded-lg transition"
                                        >
                                            Detail
                                        </Link>
                                        <Link
                                            href={route('admin.cars.edit', car.id)}
                                            className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-center rounded-lg transition"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(car)}
                                            className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {cars.data.length === 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <p className="text-gray-500">Belum ada mobil.</p>
                            <Link
                                href={route('admin.cars.create')}
                                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Tambah Mobil Pertama
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
