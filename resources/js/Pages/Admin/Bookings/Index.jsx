import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import Button from '@/Components/UI/Button';
import LoadingOverlay from '@/Components/LoadingOverlay';

export default function BookingsIndex({ bookings, filters }) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [showBulkActions, setShowBulkActions] = useState(false);
    const { post, processing } = useForm();

    const toggleSelectAll = () => {
        if (selectedIds.length === bookings.data.length) {
            setSelectedIds([]);
            setShowBulkActions(false);
        } else {
            setSelectedIds(bookings.data.map(b => b.id));
            setShowBulkActions(true);
        }
    };

    const toggleSelect = (id) => {
        const newSelected = selectedIds.includes(id)
            ? selectedIds.filter(i => i !== id)
            : [...selectedIds, id];
        setSelectedIds(newSelected);
        setShowBulkActions(newSelected.length > 0);
    };

    const handleBulkAction = (action) => {
        if (selectedIds.length === 0) return;
        router.post(route('admin.bookings.bulk-update'), {
            ids: selectedIds,
            action,
        }, {
            onSuccess: () => {
                setSelectedIds([]);
                setShowBulkActions(false);
            }
        });
    };
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Booking" />
            <LoadingOverlay show={processing} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Daftar Booking</h1>
                        <Link href={route('admin.bookings.create')}>
                            <Button>+ Buat Booking Baru</Button>
                        </Link>
                    </div>

                    {/* Bulk Actions Bar */}
                    {showBulkActions && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-center justify-between">
                            <span className="text-sm text-blue-700">
                                {selectedIds.length} booking dipilih
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleBulkAction('approve')}
                                    disabled={processing}
                                >
                                    Approve
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleBulkAction('activate')}
                                    disabled={processing}
                                >
                                    Activate
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleBulkAction('complete')}
                                    disabled={processing}
                                >
                                    Complete
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => handleBulkAction('cancel')}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <form method="get" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters.search || ''}
                                placeholder="Cari kode/customer/mobil..."
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <select
                                name="status"
                                defaultValue={filters.status || ''}
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition"
                            >
                                Filter
                            </button>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.length === bookings.data.length && bookings.data.length > 0}
                                                onChange={toggleSelectAll}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </th>
                                        <th className="px-6 py-3">Kode</th>
                                        <th className="px-6 py-3">Customer</th>
                                        <th className="px-6 py-3">Mobil</th>
                                        <th className="px-6 py-3">Tanggal</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Total</th>
                                        <th className="px-6 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {bookings.data.map((booking) => (
                                        <tr key={booking.id} className={`hover:bg-gray-50 ${selectedIds.includes(booking.id) ? 'bg-blue-50' : ''}`}>
                                            <td className="px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(booking.id)}
                                                    onChange={() => toggleSelect(booking.id)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium">{booking.booking_code}</td>
                                            <td className="px-6 py-4">{booking.customer_name}</td>
                                            <td className="px-6 py-4">{booking.car_name}</td>
                                            <td className="px-6 py-4">{booking.start_date} s/d {booking.end_date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded uppercase ${
                                                    booking.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                                                    booking.status === 'active' ? 'bg-green-100 text-green-700' :
                                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    booking.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-semibold">{formatCurrency(booking.total_price)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={route('admin.bookings.show', booking.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {bookings.links && bookings.links.length > 0 && (
                            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {bookings.from || 0} hingga {bookings.to || 0} dari {bookings.total || 0} booking
                                </div>
                                <div className="flex gap-2">
                                    {bookings.links.map((link, idx) => (
                                        <Link
                                            key={idx}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 text-sm rounded-lg border transition ${
                                                link.active
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : link.url
                                                    ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
