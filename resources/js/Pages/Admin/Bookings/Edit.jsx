import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import Alert from '@/Components/UI/Alert';
import LoadingOverlay from '@/Components/LoadingOverlay';

export default function BookingsEdit({ booking, drivers = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        customer_name: booking.customer_name || '',
        customer_phone: booking.customer_phone || '',
        customer_email: booking.customer_email || '',
        ktp_path: booking.ktp_path || '',
        car_id: booking.car_id || '',
        driver_id: booking.driver_id || '',
        rental_type: booking.rental_type || 'leasing',
        start_date: booking.start_date || '',
        end_date: booking.end_date || '',
        pickup_location: booking.pickup_location || '',
        dropoff_location: booking.dropoff_location || '',
        notes: booking.notes || '',
        status: booking.status || 'pending'
    });

    const [calculatedDays, setCalculatedDays] = useState(Math.ceil((new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24)) || 0);
    const [carDailyRate] = useState(booking.car?.price_per_day || 300000);
    const [driverDailyRate] = useState(booking.driver?.daily_rate || 0);
    const [subtotal, setSubtotal] = useState(booking.subtotal || 0);
    const [driverFee, setDriverFee] = useState(booking.driver_fee || 0);
    const [totalPrice, setTotalPrice] = useState(booking.total_price || 0);

    const calculatePrice = () => {
        if (data.start_date && data.end_date && carDailyRate) {
            const start = new Date(data.start_date);
            const end = new Date(data.end_date);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            setCalculatedDays(days > 0 ? days : 0);
            
            const newSubtotal = days * carDailyRate;
            setSubtotal(newSubtotal);
            
            const newDriverFee = data.rental_type === 'with_driver' ? days * driverDailyRate : 0;
            setDriverFee(newDriverFee);
            
            setTotalPrice(newSubtotal + newDriverFee);
        }
    };

    const handleDateChange = (field, value) => {
        setData(field, value);
        setTimeout(calculatePrice, 100);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.bookings.update', booking.id), {
            onSuccess: () => router.visit(route('admin.bookings.index')),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Booking #{booking.booking_code}</h2>
                    <Link href={route('admin.bookings.index')} className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Kembali ke Daftar
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Booking ${booking.booking_code}`} />

            <LoadingOverlay show={processing} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Error Summary */}
                            {Object.keys(errors).length > 0 && (
                                <Alert
                                    variant="error"
                                    title="Terjadi kesalahan:"
                                    messages={Object.values(errors)}
                                    onClose={() => {}}
                                />
                            )}

                            {/* Customer Section */}
                            <div className="border-b pb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Data Pelanggan</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Nama Lengkap *"
                                        value={data.customer_name}
                                        onChange={(value) => setData('customer_name', value)}
                                        error={errors.customer_name}
                                        required
                                    />

                                    <Input
                                        label="Nomor Telepon *"
                                        value={data.customer_phone}
                                        onChange={(value) => setData('customer_phone', value)}
                                        error={errors.customer_phone}
                                        required
                                    />

                                    <Input
                                        label="Email"
                                        type="email"
                                        value={data.customer_email}
                                        onChange={(value) => setData('customer_email', value)}
                                        error={errors.customer_email}
                                    />

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Foto KTP
                                        </label>
                                        <div className="flex items-center gap-4">
                                            {booking.ktp_path && (
                                                <img src={booking.ktp_path} alt="KTP" className="w-24 h-16 object-cover rounded border" />
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setData('ktp_path', e.target.files[0])}
                                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                        {errors.ktp_path && <p className="mt-1 text-xs text-red-600">{errors.ktp_path}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Rental Details */}
                            <div className="border-b pb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Detail Rental</h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mobil
                                            </label>
                                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <p className="font-medium text-gray-900">{booking.car?.brand} {booking.car?.model}</p>
                                                <p className="text-sm text-gray-500">{booking.car?.plate_number} • Rp {carDailyRate.toLocaleString('id-ID')}/hari</p>
                                            </div>
                                            <p className="mt-2 text-xs text-gray-500">Tidak dapat mengganti mobil untuk booking yang sudah dibuat.</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tipe Rental *
                                            </label>
                                            <select
                                                value={data.rental_type}
                                                onChange={(e) => setData('rental_type', e.target.value)}
                                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            >
                                                <option value="leasing">Lepas Kunci</option>
                                                <option value="with_driver">Dengan Sopir</option>
                                            </select>
                                            {errors.rental_type && <p className="mt-1 text-sm text-red-600">{errors.rental_type}</p>}
                                        </div>
                                    </div>

                                    {data.rental_type === 'with_driver' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sopir
                                            </label>
                                            {booking.driver ? (
                                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                    <p className="font-medium text-gray-900">{booking.driver.name}</p>
                                                    <p className="text-sm text-gray-500">{booking.driver.phone} • Rp {driverDailyRate.toLocaleString('id-ID')}/hari</p>
                                                </div>
                                            ) : (
                                                <select
                                                    value={data.driver_id}
                                                    onChange={(e) => setData('driver_id', e.target.value)}
                                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <option value="">-- Pilih Sopir --</option>
                                                    {drivers.map(driver => (
                                                        <option key={driver.id} value={driver.id}>{driver.label}</option>
                                                    ))}
                                                </select>
                                            )}
                                            {errors.driver_id && <p className="mt-1 text-sm text-red-600">{errors.driver_id}</p>}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Tanggal Mulai *"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(value) => handleDateChange('start_date', value)}
                                            error={errors.start_date}
                                            required
                                        />

                                        <Input
                                            label="Tanggal Selesai *"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(value) => handleDateChange('end_date', value)}
                                            error={errors.end_date}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Lokasi Pick-up"
                                            value={data.pickup_location}
                                            onChange={(value) => setData('pickup_location', value)}
                                            error={errors.pickup_location}
                                        />

                                        <Input
                                            label="Lokasi Drop-off"
                                            value={data.dropoff_location}
                                            onChange={(value) => setData('dropoff_location', value)}
                                            error={errors.dropoff_location}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Catatan Tambahan
                                        </label>
                                        <textarea
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            rows={3}
                                            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Status Booking</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status Saat Ini
                                        </label>
                                        <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium ${
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            booking.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                                            booking.status === 'active' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Update Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="active">Active</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Summary */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Rincian Harga</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Lama Rental</span>
                                        <span className="font-medium">{calculatedDays} hari</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Harga Mobil per Hari</span>
                                        <span className="font-medium">Rp {carDailyRate.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal Mobil</span>
                                        <span className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
                                    </div>
                                    {driverFee > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Biaya Sopir</span>
                                            <span className="font-medium">Rp {driverFee.toLocaleString('id-ID')}</span>
                                        </div>
                                    )}
                                    <hr />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-blue-700">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col items-start gap-3 pt-4 border-t sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                                <Link href={route('admin.bookings.show', booking.id)}>
                                    <Button variant="outline">← Lihat Detail</Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    isLoading={processing}
                                >
                                    {processing ? 'Menyimpan...' : 'Update Booking'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}