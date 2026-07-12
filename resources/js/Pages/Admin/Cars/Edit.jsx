import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import LoadingOverlay from '@/Components/LoadingOverlay';
import Alert from '@/Components/UI/Alert';

export default function CarsEdit({ car }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        brand: car.brand || '',
        model: car.model || '',
        category: car.category || '',
        plate_number: car.plate_number || '',
        capacity: car.capacity || '',
        transmission: car.transmission || '',
        price_per_day: car.price_per_day || '',
        status: car.status || 'available',
        description: car.description || '',
        photos: [],
        delete_photos: []
    });

    const [previews, setPreviews] = useState([]);
    const [existingPhotos, setExistingPhotos] = useState(car.photos || []);

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        setData('photos', files);
        
        const urls = files.map(file => URL.createObjectURL(file));
        setPreviews(urls);
    };

    const removeNewPhoto = (index) => {
        const newPhotos = data.photos.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setData('photos', newPhotos);
        setPreviews(newPreviews);
    };

    const removeExistingPhoto = (photoId) => {
        setExistingPhotos(existingPhotos.filter(p => p.id !== photoId));
        setData('delete_photos', [...data.delete_photos, photoId]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.cars.update', car.id), {
            onFinish: () => router.visit(route('admin.cars.index')),
            onStart: () => {},
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Mobil: {car.brand} {car.model}
                </h2>
            }
        >
            <Head title={`Edit ${car.brand} ${car.model}`} />

            <LoadingOverlay show={processing} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Error Summary */}
                            {Object.keys(errors).length > 0 && (
                                <Alert
                                    type="error"
                                    title="Terjadi kesalahan:"
                                    messages={Object.values(errors)}
                                    onClose={() => {}}
                                />
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Brand"
                                    value={data.brand}
                                    onChange={(value) => setData('brand', value)}
                                    error={errors.brand}
                                    placeholder="Toyota"
                                    required
                                />

                                <Input
                                    label="Model"
                                    value={data.model}
                                    onChange={(value) => setData('model', value)}
                                    error={errors.model}
                                    placeholder="Avanza"
                                    required
                                />
                            </div>

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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Plat Nomor"
                                    value={data.plate_number}
                                    onChange={(value) => setData('plate_number', value)}
                                    error={errors.plate_number}
                                    placeholder="B 1234 ABC"
                                    required
                                />

                                <Input
                                    label="Kapasitas (seat)"
                                    type="number"
                                    min="1"
                                    value={data.capacity}
                                    onChange={(value) => setData('capacity', value)}
                                    error={errors.capacity}
                                    placeholder="7"
                                    required
                                />
                            </div>

                            <Input
                                label="Harga per Hari (Rp)"
                                type="number"
                                min="0"
                                value={data.price_per_day}
                                onChange={(value) => setData('price_per_day', value)}
                                error={errors.price_per_day}
                                placeholder="300000"
                                required
                            />

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

                            {/* Existing Photos */}
                            {existingPhotos.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Foto Existing
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {existingPhotos.map((photo) => (
                                            <div key={photo.id} className="relative aspect-video">
                                                <img
                                                    src={photo.url}
                                                    alt={photo.filename}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingPhoto(photo.id)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* New Photos */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Foto Baru
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
                                                    onClick={() => removeNewPhoto(index)}
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
                            <div className="flex flex-col items-start gap-3 pt-4 border-t sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                                <Link href={route('admin.cars.index')}>
                                    <Button variant="outline">← Kembali ke Daftar Mobil</Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    isLoading={processing}
                                >
                                    {processing ? 'Menyimpan...' : 'Update'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
