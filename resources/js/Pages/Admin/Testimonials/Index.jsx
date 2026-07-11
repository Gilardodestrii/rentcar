import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TestimonialIndex({ testimonials }) {
    const { post } = useForm();

    const handleStatusChange = (id, status) => {
        post(route(status === 'approved' ? 'admin.testimonials.approve' : 'admin.testimonials.reject', id));
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };
        return colors[status] || colors.pending;
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900">Moderasi Testimoni</h2>
            }
        >
            <Head title="Testimoni" />

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                {testimonials?.data?.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {testimonials.data.map((testimonial) => (
                            <div key={testimonial.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    {/* Testimonial Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{testimonial.customer_name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {testimonial.car?.brand} {testimonial.car?.model} • 
                                                    {new Date(testimonial.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(testimonial.status)}`}>
                                                {testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1)}
                                            </span>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center mb-3">
                                            <div className="flex items-center mr-2">
                                                {renderStars(testimonial.rating)}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{testimonial.rating}/5</span>
                                        </div>

                                        {/* Comment */}
                                        <blockquote className="text-gray-700 italic border-l-4 border-gray-200 pl-4">
                                            "{testimonial.comment}"
                                        </blockquote>

                                        {/* Booking Info */}
                                        {testimonial.booking && (
                                            <div className="mt-3 text-sm text-gray-500">
                                                Booking: #{testimonial.booking.booking_code}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex lg:flex-col gap-2">
                                        {testimonial.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(testimonial.id, 'approved')}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(testimonial.id, 'rejected')}
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {testimonial.status === 'approved' && (
                                            <button
                                                onClick={() => handleStatusChange(testimonial.id, 'rejected')}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
                                            >
                                                Reject
                                            </button>
                                        )}
                                        {testimonial.status === 'rejected' && (
                                            <button
                                                onClick={() => handleStatusChange(testimonial.id, 'approved')}
                                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm"
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada testimoni</h3>
                        <p className="text-gray-500">Testimoni dari pelanggan akan muncul di sini untuk dimoderasi.</p>
                    </div>
                )}

                {/* Pagination */}
                {testimonials?.links && (
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-center">
                            <nav className="flex space-x-2">
                                {testimonials.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 rounded transition-colors text-sm ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
