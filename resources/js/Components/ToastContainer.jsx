import { usePage } from '@inertiajs/react';
import Toast from './Toast';

export default function ToastContainer() {
    const { flash } = usePage().props;

    return (
        <>
            {flash?.success && <Toast type="success" message={flash.success} />}
            {flash?.error && <Toast type="error" message={flash.error} />}
            {flash?.warning && <Toast type="warning" message={flash.warning} />}
            {flash?.info && <Toast type="info" message={flash.info} />}
        </>
    );
}
