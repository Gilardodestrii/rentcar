import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/UI/Button';

export default function DriversIndex({ drivers, filters }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Sopir" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Daftar Sopir</h1>
                        <Link href={route('admin.drivers.create')}><Button>+ Tambah Sopir</Button></Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <form method="get" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input name="search" defaultValue={filters.search || ''} placeholder="Cari nama/telepon/sim..." className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                            <select name="status" defaultValue={filters.status || ''} className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                <option value="">Semua Status</option>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">Filter</button>
                        </form>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Nama</th>
                                        <th className="px-6 py-3">Telepon</th>
                                        <th className="px-6 py-3">SIM</th>
                                        <th className="px-6 py-3">Tarif</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {drivers.data.map((driver) => (
                                        <tr key={driver.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium">{driver.name}</td>
                                            <td className="px-6 py-4">{driver.phone}</td>
                                            <td className="px-6 py-4">{driver.license_number}</td>
                                            <td className="px-6 py-4">{formatCurrency(driver.daily_rate)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${driver.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{driver.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Link href={route('admin.drivers.edit', driver.id)} className="text-blue-600 hover:underline">Edit</Link>
                                                <button onClick={() => router.delete(route('admin.drivers.destroy', driver.id))} className="text-red-600 hover:underline">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
