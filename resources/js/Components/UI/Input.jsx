import { forwardRef } from 'react';

const inputVariants = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
};

const inputSizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
};

const Input = forwardRef(function Input(
    { variant = 'default', size = 'md', className = '', error, ...props },
    ref
) {
    return (
        <div className="w-full">
            <input
                ref={ref}
                className={`
                    block w-full rounded-lg border bg-white shadow-sm
                    ${inputVariants[variant]}
                    ${inputSizes[size]}
                    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
});

export default Input;
