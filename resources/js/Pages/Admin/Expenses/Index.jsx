import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ExpenseIndex({ expenses, cars, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [category, setCategory] = useState(filters?.category || '');
    const [carId, setCarId] = useState(filters?.car_id || '');

    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus pengeluaran ini?')) {
            destroy(route('admin.expenses.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Pengeluaran</h2>
                    <Link
                        href={route('admin.expenses.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Tambah Pengeluaran
                    </Link>
                </div>
            }
        >
            <Head title="Pengeluaran" />

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cari</label>
                        <input
                            type="text"
                            placeholder="Cari judul..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobil</label>
                        <select
                            value={carId}
                            onChange={(e) => setCarId(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                            <option value="">Semua Mobil</option>
                            {cars?.map(car => (
                                <option key={car.id} value={car.id}>{car.brand} {car.model}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                            <option value="">Semua Kategori</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="fuel">Fuel</option>
                            <option value="insurance">Insurance</option>
                            <option value="tax">Tax</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <Link
                            href={route('admin.expenses.index')}
                            data={{
                                search: searchTerm,
                                category,
                                car_id: carId
                            }}
                            className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors text-center"
                        >
                            Filter
                        </Link>
                    </div>
                </div>
            </div>

            {/* Expenses Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobil</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {expenses?.data?.length > 0 ? (
                                expenses.data.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(expense.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            <div>
                                                <p>{expense.title}</p>
                                                {expense.notes && <p className="text-xs text-gray-500 mt-1">{expense.notes}</p>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {expense.car?.brand} {expense.car?.model}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                                expense.category === 'maintenance' ? 'bg-red-100 text-red-800' :
                                                expense.category === 'fuel' ? 'bg-yellow-100 text-yellow-800' :
                                                expense.category === 'insurance' ? 'bg-blue-100 text-blue-800' :
                                                expense.category === 'tax' ? 'bg-purple-100 text-purple-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Rp {expense.amount?.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                            <Link
                                                href={route('admin.expenses.edit', expense.id)}
                                                className="text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(expense.id)}
                                                className="text-red-600 hover:text-red-700 font-medium"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                                        Belum ada pengeluaran
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {expenses?.links && (
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-center">
                            <nav className="flex space-x-2">
                                {expenses.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 rounded transition-colors text-sm ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
