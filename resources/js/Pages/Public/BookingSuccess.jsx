import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function BookingSuccess({ booking }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value || 0);

    return (
        <GuestLayout>
            <Head title={`Booking Berhasil ${booking.booking_code}`} />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Booking Berhasil Dibuat</h1>
                    <p className="mt-2 text-gray-600">Simpan kode booking ini untuk cek status pesanan.</p>

                    <div className="mt-6 rounded-xl bg-blue-50 p-4">
                        <p className="text-sm text-blue-700">Kode Booking</p>
                        <p className="mt-1 text-3xl font-extrabold tracking-wide text-blue-900">{booking.booking_code}</p>
                    </div>

                    <div className="mt-6 grid gap-4 text-left md:grid-cols-2">
                        <div className="rounded-xl border p-4">
                            <p className="text-sm text-gray-500">Pelanggan</p>
                            <p className="font-semibold text-gray-900">{booking.customer_name}</p>
                            <p className="text-sm text-gray-600">{booking.customer_phone}</p>
                        </div>
                        <div className="rounded-xl border p-4">
                            <p className="text-sm text-gray-500">Mobil</p>
                            <p className="font-semibold text-gray-900">{booking.car.brand} {booking.car.model}</p>
                            <p className="text-sm text-gray-600">{booking.start_date} - {booking.end_date}</p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl border p-4 text-left">
                        <div className="flex justify-between text-sm"><span>Durasi</span><span>{booking.duration} hari</span></div>
                        <div className="mt-2 flex justify-between text-sm"><span>Subtotal Mobil</span><span>{formatCurrency(booking.subtotal)}</span></div>
                        {booking.driver_fee > 0 && <div className="mt-2 flex justify-between text-sm"><span>Biaya Sopir</span><span>{formatCurrency(booking.driver_fee)}</span></div>}
                        <div className="mt-3 flex justify-between border-t pt-3 text-lg font-bold"><span>Total</span><span>{formatCurrency(booking.total_price)}</span></div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link href={route('public.booking.check-status')} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Cek Status</Link>
                        <Link href={route('public.catalog')} className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50">Lihat Katalog</Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
