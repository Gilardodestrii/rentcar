import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import Alert from '@/Components/UI/Alert';
import LoadingOverlay from '@/Components/LoadingOverlay';

export default function DriversCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '', phone: '', license_number: '', daily_rate: '', status: 'available', photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.drivers.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Sopir</h2>}>
            <Head title="Tambah Sopir" />
            <LoadingOverlay show={processing} message="Menyimpan data..." />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="bg-white shadow-sm sm:rounded-lg p-6 space-y-6">
                        {Object.keys(errors).length > 0 && <Alert type="error" title="Terjadi kesalahan" messages={Object.values(errors)} />}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Nama Lengkap" value={data.name} onChange={(v)=>setData('name',v)} error={errors.name} required />
                            <Input label="Nomor Telepon / WhatsApp" value={data.phone} onChange={(v)=>setData('phone',v)} error={errors.phone} required />
                            <Input label="Nomor SIM" value={data.license_number} onChange={(v)=>setData('license_number',v)} error={errors.license_number} required />
                            <Input label="Tarif Harian (Rp)" type="number" value={data.daily_rate} onChange={(v)=>setData('daily_rate',v)} error={errors.daily_rate} required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select value={data.status} onChange={(e)=>setData('status',e.target.value)} className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                <option value="available">Tersedia</option>
                                <option value="unavailable">Tidak Tersedia</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Foto Sopir</label>
                            <input type="file" accept="image/*" onChange={(e)=>setData('photo',e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Link href={route('admin.drivers.index')}><Button variant="outline">Batal</Button></Link>
                            <Button type="submit" isLoading={processing}>Simpan Sopir</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
