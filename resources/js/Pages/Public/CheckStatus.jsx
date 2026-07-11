import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function CheckStatus() {
    const { data, setData, post, processing, errors } = useForm({ booking_code: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('public.booking.get-status'));
    };

    return (
        <GuestLayout>
            <Head title="Cek Status Booking" />
            <div className="max-w-xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-900">Cek Status Booking</h1>
                    <p className="mt-2 text-gray-600">Masukkan kode booking yang kamu terima setelah submit pesanan.</p>

                    <form onSubmit={submit} className="mt-6 space-y-4">
                        {errors.error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errors.error}</div>}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Kode Booking</label>
                            <input
                                value={data.booking_code}
                                onChange={(e) => setData('booking_code', e.target.value.toUpperCase())}
                                className="w-full rounded-lg border-gray-300 text-lg font-semibold tracking-wide focus:border-blue-500 focus:ring-blue-500"
                                placeholder="RC-XXXXXX"
                                required
                            />
                            {errors.booking_code && <p className="mt-1 text-sm text-red-600">{errors.booking_code}</p>}
                        </div>
                        <button disabled={processing} className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400">
                            {processing ? 'Mencari...' : 'Cek Status'}
                        </button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
