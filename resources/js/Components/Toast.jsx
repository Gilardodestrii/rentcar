import { useEffect, useState } from 'react';

const toastStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const iconMap = {
    success: '✓',
    error: '✕',
    warning: '!',
    info: 'ℹ',
};

export default function Toast({ type = 'info', message, autoClose = 4000 }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => setShow(false), autoClose);
            return () => clearTimeout(timer);
        }
    }, [autoClose]);

    if (!show) return null;

    return (
        <div
            className={`fixed top-4 right-4 max-w-sm p-4 border rounded-lg shadow-lg animate-in fade-in slide-in-from-top-2 ${toastStyles[type]}`}
            role="alert"
        >
            <div className="flex items-center gap-3">
                <span className="text-lg font-bold">{iconMap[type]}</span>
                <span className="flex-1">{message}</span>
                <button
                    onClick={() => setShow(false)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    ×
                </button>
            </div>
        </div>
    );
}
