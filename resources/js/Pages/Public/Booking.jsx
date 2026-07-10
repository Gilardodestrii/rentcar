import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Booking({ car, drivers }) {
    const [pricePreview, setPricePreview] = useState(null);
    const [conflicts, setConflicts] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        car_id: car?.id || '',
        driver_id: '',
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        ktp_path: null,
        start_date: '',
        end_date: '',
        pickup_location: '',
        dropoff_location: '',
        notes: '',
    });

    useEffect(() => {
        if (!data.car_id || !data.start_date || !data.end_date) return;

        const calculatePrice = async () => {
            try {
                const response = await fetch(route('public.booking.calculate-price'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                    body: JSON.stringify({
                        car_id: data.car_id,
                        driver_id: data.driver_id || null,
                        start_date: data.start_date,
                        end_date: data.end_date,
                    }),
                });
                const result = await response.json();
                setPricePreview(result.price);
                setConflicts(result.conflicts || []);
            } catch (err) {
                console.error('Price calculation failed:', err);
            }
        };

        calculatePrice();
    }, [data.car_id, data.driver_id, data.start_date, data.end_date]);

    const submit = (e) => {
        e.preventDefault();
        post(route('public.booking.store'), { forceFormData: true });
    };

    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value || 0);

    return (
        <GuestLayout>
            <Head title="Booking Mobil" />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Form Booking Mobil</h1>

                {car && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex gap-4">
                        {car.photo && (
                            <img src={car.photo} alt={`${car.brand} ${car.model}`} className="w-32 h-24 object-cover rounded-lg" />
                        )}
                        <div>
                            <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
                            <p className="text-blue-600 font-bold">{formatCurrency(car.price_per_day)}/hari</p>
                        </div>
                    </div>
                )}

                <form onSubmit={submit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                    {errors.error && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-lg">{errors.error}</div>
                    )}

                    {conflicts.length > 0 && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                            {conflicts.map((conflict, i) => <div key={i}>{conflict}</div>)}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                            <input
                                type="text"
                                value={data.customer_name}
                                onChange={(e) => setData('customer_name', e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.customer_name && <p className="text-red-600 text-sm mt-1">{errors.customer_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp *</label>
                            <input
                                type="text"
                                value={data.customer_phone}
                                onChange={(e) => setData('customer_phone', e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.customer_phone && <p className="text-red-600 text-sm mt-1">{errors.customer_phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={data.customer_email}
                                onChange={(e) => setData('customer_email', e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.customer_email && <p className="text-red-600 text-sm mt-1">{errors.customer_email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Foto KTP *</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('ktp_path', e.target.files[0])}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.ktp_path && <p className="text-red-600 text-sm mt-1">{errors.ktp_path}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai *</label>
                            <input
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.start_date && <p className="text-red-600 text-sm mt-1">{errors.start_date}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai *</label>
                            <input
                                type="date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.end_date && <p className="text-red-600 text-sm mt-1">{errors.end_date}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pakai Sopir?</label>
                        <select
                            value={data.driver_id}
                            onChange={(e) => setData('driver_id', e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Lepas Kunci</option>
                            {drivers.map((driver) => (
                                <option key={driver.id} value={driver.id}>{driver.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Jemput</label>
                            <input
                                type="text"
                                value={data.pickup_location}
                                onChange={(e) => setData('pickup_location', e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Kembali</label>
                            <input
                                type="text"
                                value={data.dropoff_location}
                                onChange={(e) => setData('dropoff_location', e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                        <textarea
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            rows="3"
                        />
                    </div>

                    {pricePreview && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Rincian Harga</h3>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between"><span>Durasi</span><span>{pricePreview.duration} hari</span></div>
                                <div className="flex justify-between"><span>Subtotal Mobil</span><span>{formatCurrency(pricePreview.subtotal)}</span></div>
                                {pricePreview.driver_fee > 0 && (
                                    <div className="flex justify-between"><span>Biaya Sopir</span><span>{formatCurrency(pricePreview.driver_fee)}</span></div>
                                )}
                                <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span>{formatCurrency(pricePreview.total_price)}</span></div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={processing || conflicts.length > 0}
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
                    >
                        {processing ? 'Memproses...' : 'Kirim Booking'}
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}
