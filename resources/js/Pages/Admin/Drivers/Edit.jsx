import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import Alert from '@/Components/UI/Alert';
import LoadingOverlay from '@/Components/LoadingOverlay';

export default function DriversEdit({ driver }) {
    const { data, setData, put, processing, errors } = useForm({
        name: driver.name || '', phone: driver.phone || '', license_number: driver.license_number || '', daily_rate: driver.daily_rate || '', status: driver.status || 'available', photo: null,
    });

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Sopir ${driver.name}`} />
            <LoadingOverlay show={processing} />
            <div className="py-12"><div className="max-w-3xl mx-auto sm:px-6 lg:px-8"><div className="bg-white shadow-sm sm:rounded-lg p-6 space-y-6">
                {Object.keys(errors).length > 0 && <Alert type="error" title="Terjadi kesalahan" messages={Object.values(errors)} />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Nama" value={data.name} onChange={(v)=>setData('name',v)} error={errors.name} required />
                    <Input label="Telepon" value={data.phone} onChange={(v)=>setData('phone',v)} error={errors.phone} required />
                    <Input label="Nomor SIM" value={data.license_number} onChange={(v)=>setData('license_number',v)} error={errors.license_number} required />
                    <Input label="Tarif Harian" type="number" value={data.daily_rate} onChange={(v)=>setData('daily_rate',v)} error={errors.daily_rate} required />
                </div>
                <select value={data.status} onChange={(e)=>setData('status',e.target.value)} className="w-full rounded-lg border-gray-300"><option value="available">Available</option><option value="unavailable">Unavailable</option></select>
                <input type="file" accept="image/*" onChange={(e)=>setData('photo',e.target.files[0])} />
                <div className="flex justify-end gap-3"><Link href={route('admin.drivers.index')}><Button variant="outline">Batal</Button></Link><Button onClick={(e)=>{e.preventDefault();put(route('admin.drivers.update', driver.id));}} isLoading={processing}>Update</Button></div>
            </div></div></div>
        </AuthenticatedLayout>
    );
}
