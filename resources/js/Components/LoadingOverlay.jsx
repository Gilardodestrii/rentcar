import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function LoadingOverlay({ show = false }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => setIsVisible(true), 300);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [show]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-[60] flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-gray-700">Memproses...</span>
            </div>
        </div>
    );
}
