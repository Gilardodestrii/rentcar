import { forwardRef } from 'react';

const buttonVariants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
};

const buttonSizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
};

const Button = forwardRef(function Button(
    { variant = 'primary', size = 'md', className = '', disabled = false, children, ...props },
    ref
) {
    return (
        <button
            ref={ref}
            disabled={disabled}
            className={`
                inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                ${buttonVariants[variant]}
                ${buttonSizes[size]}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
});

export { Button };
export default Button;
