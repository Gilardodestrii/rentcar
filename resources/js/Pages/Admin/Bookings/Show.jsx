import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ShowBooking({ booking }) {
    const { post, processing } = useForm();

    const handleAction = (action) => {
        post(route(`admin.bookings.${action}`, booking.id));
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-blue-100 text-blue-800',
            active: 'bg-green-100 text-green-800',
            completed: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || colors.pending;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Booking #{booking.booking_code}</h2>
                    <Link href={route('admin.bookings.index')} className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title={`Booking ${booking.booking_code}`} />

            <div className="space-y-6">
                {/* Status & Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                            <span className="text-gray-500 text-sm">
                                Dibuat: {new Date(booking.created_at).toLocaleDateString('id-ID', { 
                                    day: '2-digit', month: 'short', year: 'numeric', 
                                    hour: '2-digit', minute: '2-digit' 
                                })}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {booking.status === 'pending' && (
                                <>
                                    <button 
                                        onClick={() => handleAction('approve')} 
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => handleAction('cancel')} 
                                        disabled={processing}
                                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                            {booking.status === 'approved' && (
                                <>
                                    <button 
                                        onClick={() => handleAction('activate')} 
                                        disabled={processing}
                                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Activate
                                    </button>
                                    <button 
                                        onClick={() => handleAction('cancel')} 
                                        disabled={processing}
                                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                            {booking.status === 'active' && (
                                <button 
                                    onClick={() => handleAction('complete')} 
                                    disabled={processing}
                                    className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Complete
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Data Pelanggan</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Nama</p>
                                <p className="font-medium text-gray-900">{booking.customer_name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Telepon</p>
                                <p className="font-medium text-gray-900">{booking.customer_phone}</p>
                            </div>
                            {booking.customer_email && (
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium text-gray-900">{booking.customer_email}</p>
                                </div>
                            )}
                            {booking.ktp_path && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">KTP</p>
                                    <img src={booking.ktp_path} alt="KTP" className="w-32 h-20 object-cover rounded border" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Car & Driver Info */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Kendaraan & Sopir</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Kendaraan</p>
                                <p className="font-medium text-gray-900">{booking.car?.brand} {booking.car?.model}</p>
                                <p className="text-xs text-gray-500">{booking.car?.plate_number}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tipe Rental</p>
                                <p className="font-medium text-gray-900 capitalize">
                                    {booking.rental_type === 'leasing' ? 'Lepas Kunci' : 'Dengan Sopir'}
                                </p>
                            </div>
                            {booking.driver && (
                                <div>
                                    <p className="text-sm text-gray-500">Sopir</p>
                                    <p className="font-medium text-gray-900">{booking.driver.name}</p>
                                    <p className="text-xs text-gray-500">{booking.driver.phone}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-gray-500">Periode</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(booking.start_date).toLocaleDateString('id-ID')} - {new Date(booking.end_date).toLocaleDateString('id-ID')}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {Math.ceil((new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24))} hari
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Info */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Rincian Harga</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal Mobil</span>
                                <span className="font-medium">Rp {booking.subtotal?.toLocaleString('id-ID')}</span>
                            </div>
                            {booking.driver_fee > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Biaya Sopir</span>
                                    <span className="font-medium">Rp {booking.driver_fee?.toLocaleString('id-ID')}</span>
                                </div>
                            )}
                            <hr />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>Rp {booking.total_price?.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location & Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {(booking.pickup_location || booking.dropoff_location) && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Lokasi</h3>
                            <div className="space-y-3">
                                {booking.pickup_location && (
                                    <div>
                                        <p className="text-sm text-gray-500">Pickup</p>
                                        <p className="font-medium text-gray-900">{booking.pickup_location}</p>
                                    </div>
                                )}
                                {booking.dropoff_location && (
                                    <div>
                                        <p className="text-sm text-gray-500">Drop-off</p>
                                        <p className="font-medium text-gray-900">{booking.dropoff_location}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {booking.notes && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Catatan</h3>
                            <p className="text-gray-600">{booking.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
