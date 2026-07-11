import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function BookingStatus({ booking }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value || 0);

    const statusClass = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-blue-100 text-blue-800',
        active: 'bg-green-100 text-green-800',
        completed: 'bg-gray-100 text-gray-800',
        cancelled: 'bg-red-100 text-red-800',
    }[booking.status] || 'bg-gray-100 text-gray-800';

    return (
        <GuestLayout>
            <Head title={`Status Booking ${booking.booking_code}`} />
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Kode Booking</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{booking.booking_code}</h1>
                    </div>
                    <span className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-bold uppercase ${statusClass}`}>{booking.status}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl bg-white p-6 shadow-sm border">
                        <h2 className="font-bold text-gray-900">Pelanggan</h2>
                        <p className="mt-3 font-semibold">{booking.customer_name}</p>
                        <p className="text-sm text-gray-600">{booking.customer_phone}</p>
                        <p className="mt-3 text-xs text-gray-500">Dibuat: {booking.created_at}</p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm border">
                        <h2 className="font-bold text-gray-900">Mobil</h2>
                        <p className="mt-3 font-semibold">{booking.car.brand} {booking.car.model}</p>
                        <p className="text-sm text-gray-600">{booking.car.plate_number}</p>
                        <p className="mt-3 text-sm text-gray-600">{booking.start_date} - {booking.end_date}</p>
                        <p className="text-sm text-gray-600">{booking.duration} hari</p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm border">
                        <h2 className="font-bold text-gray-900">Sopir</h2>
                        {booking.driver ? (
                            <>
                                <p className="mt-3 font-semibold">{booking.driver.name}</p>
                                <p className="text-sm text-gray-600">{booking.driver.phone}</p>
                            </>
                        ) : (
                            <p className="mt-3 text-gray-600">Lepas kunci</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-6 shadow-sm border">
                        <h2 className="font-bold text-gray-900">Lokasi</h2>
                        <p className="mt-3 text-sm text-gray-500">Pickup</p>
                        <p className="font-medium">{booking.pickup_location || '-'}</p>
                        <p className="mt-3 text-sm text-gray-500">Drop-off</p>
                        <p className="font-medium">{booking.dropoff_location || '-'}</p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm border">
                        <h2 className="font-bold text-gray-900">Rincian Harga</h2>
                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(booking.subtotal)}</span></div>
                            {booking.driver_fee > 0 && <div className="flex justify-between"><span>Biaya Sopir</span><span>{formatCurrency(booking.driver_fee)}</span></div>}
                            <div className="flex justify-between border-t pt-3 text-lg font-bold"><span>Total</span><span>{formatCurrency(booking.total_price)}</span></div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <Link href={route('public.booking.check-status')} className="rounded-lg border px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50">Cek Kode Lain</Link>
                    <Link href={route('public.catalog')} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Lihat Katalog</Link>
                </div>
            </div>
        </GuestLayout>
    );
}
