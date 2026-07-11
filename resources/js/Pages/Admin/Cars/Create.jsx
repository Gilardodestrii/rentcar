import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import Button from '@/Components/UI/Button';
import Alert from '@/Components/UI/Alert';
import LoadingOverlay from '@/Components/LoadingOverlay';

export default function CarsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        brand: '',
        model: '',
        category: '',
        plate_number: '',
        capacity: '',
        transmission: '',
        price_per_day: '',
        description: '',
        photos: []
    });

    const [previews, setPreviews] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.cars.store'), {
            preserveScroll: true,
            onStart: () => router.visit(route('admin.cars.index'), { preserveScroll: true }),
        });
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        setData('photos', files);
        
        // ponytail: preview bisa jadi base64 atau FileReader, sekarang URL.createObjectURL untuk efisiensi
        const urls = files.map(file => URL.createObjectURL(file));
        setPreviews(urls);
    };

    const removePhoto = (index) => {
        const newPhotos = data.photos.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setData('photos', newPhotos);
        setPreviews(newPreviews);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Mobil Baru
                </h2>
            }
        >
            <Head title="Tambah Mobil" />

            <LoadingOverlay show={processing} message="Menyimpan data..." />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6">
                            <Alert variant="error" title="Terjadi kesalahan" onClose={() => {}}>
                                <ul className="list-disc list-inside space-y-1">
                                    {Object.entries(errors).map(([field, message]) => (
                                        <li key={field}>{message}</li>
                                    ))}
                                </ul>
                            </Alert>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Brand & Model */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Brand <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.brand}
                                        onChange={e => setData('brand', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Toyota"
                                    />
                                    {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Model <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.model}
                                        onChange={e => setData('model', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Avanza"
                                    />
                                    {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
                                </div>
                            </div>

                            {/* Category & Transmission */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategori <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        <option value="sedan">Sedan</option>
                                        <option value="suv">SUV</option>
                                        <option value="mpv">MPV</option>
                                        <option value="hatchback">Hatchback</option>
                                        <option value="luxury">Luxury</option>
                                    </select>
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Transmisi <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.transmission}
                                        onChange={e => setData('transmission', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih Transmisi</option>
                                        <option value="manual">Manual</option>
                                        <option value="automatic">Automatic</option>
                                    </select>
                                    {errors.transmission && <p className="mt-1 text-sm text-red-600">{errors.transmission}</p>}
                                </div>
                            </div>

                            {/* Plate Number & Capacity */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Plat Nomor <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.plate_number}
                                        onChange={e => setData('plate_number', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="B 1234 ABC"
                                    />
                                    {errors.plate_number && <p className="mt-1 text-sm text-red-600">{errors.plate_number}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kapasitas (seat) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.capacity}
                                        onChange={e => setData('capacity', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="7"
                                    />
                                    {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Harga per Hari (Rp) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.price_per_day}
                                    onChange={e => setData('price_per_day', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="300000"
                                />
                                {errors.price_per_day && <p className="mt-1 text-sm text-red-600">{errors.price_per_day}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Deskripsi lengkap tentang mobil..."
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Photos */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Foto Mobil
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.photos && <p className="mt-1 text-sm text-red-600">{errors.photos}</p>}
                                
                                {previews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {previews.map((preview, index) => (
                                            <div key={index} className="relative aspect-video">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePhoto(index)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                                <Link
                                    href={route('admin.cars.index')}
                                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                                >
                                    ← Kembali ke Daftar Mobil
                                </Link>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" onClick={() => setData({ ...data, brand: '', model: '', category: '', plate_number: '', capacity: '', transmission: '', price_per_day: '', description: '', photos: [] })}>
                                        Reset
                                    </Button>
                                    <Button type="submit" variant="primary" disabled={processing} className="min-w-[80px]">
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
