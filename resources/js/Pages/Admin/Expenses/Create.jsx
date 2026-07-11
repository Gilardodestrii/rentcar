import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CreateExpense({ cars }) {
    const { data, setData, post, processing, errors } = useForm({
        car_id: '',
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'maintenance',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.expenses.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Tambah Pengeluaran</h2>
                    <Link href={route('admin.expenses.index')} className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Pengeluaran" />

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mobil <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.car_id}
                                onChange={(e) => setData('car_id', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            >
                                <option value="">Pilih Mobil</option>
                                {cars?.map(car => (
                                    <option key={car.id} value={car.id}>{car.brand} {car.model} ({car.plate_number})</option>
                                ))}
                            </select>
                            {errors.car_id && <p className="text-red-500 text-sm mt-1">{errors.car_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Judul Pengeluaran <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. Service rutin, Ganti oli, dll"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategori <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            >
                                <option value="maintenance">Maintenance</option>
                                <option value="fuel">Fuel</option>
                                <option value="insurance">Insurance</option>
                                <option value="tax">Tax</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Jumlah (Rp) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                placeholder="0"
                                min="0"
                                step="1000"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Catatan (opsional)
                        </label>
                        <textarea
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            placeholder="Detail tambahan tentang pengeluaran ini..."
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        />
                        {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
                    </div>

                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                        <Link
                            href={route('admin.expenses.index')}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors font-medium"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
