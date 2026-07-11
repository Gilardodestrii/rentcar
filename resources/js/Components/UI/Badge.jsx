const badgeVariants = {
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    neutral: 'bg-gray-100 text-gray-800',
};

const badgeSizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
};

export default function Badge({ variant = 'neutral', size = 'md', children, className = '' }) {
    return (
        <span
            className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full font-medium
                ${badgeVariants[variant]}
                ${badgeSizes[size]}
                ${className}
            `}
        >
            {children}
        </span>
    );
}
