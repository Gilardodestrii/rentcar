import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Static Tailwind class mapping — prevents purge removal
const statColors = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
};

export default function Dashboard({ stats, recentBookings, revenueChart }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            }
        >
            <Head title="Dashboard" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Booking', value: stats?.total_bookings || 0, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'blue' },
                    { label: 'Pending', value: stats?.pending_bookings || 0, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'yellow' },
                    { label: 'Pendapatan', value: `Rp ${(stats?.total_revenue || 0).toLocaleString('id-ID')}`, icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 002 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 002-2H9a2 2 0 002 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', color: 'green' },
                    { label: 'Mobil Aktif', value: `${stats?.active_cars || 0}/${stats?.total_cars || 0}`, icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2', color: 'purple' },
                ].map((stat, i) => {
                    const colorStyles = statColors[stat.color] || statColors.blue;
                    return (
                        <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 ${colorStyles.bg} rounded-lg flex items-center justify-center`}>
                                    <svg className={`w-6 h-6 ${colorStyles.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Bookings */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900">Booking Terbaru</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobil</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentBookings?.length > 0 ? (
                                    recentBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.booking_code}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.customer_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.car?.brand} {booking.car?.model}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {new Date(booking.start_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    booking.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                                                    booking.status === 'active' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Rp {booking.total_price?.toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                                            Belum ada booking
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Pendapatan 6 Bulan</h3>
                    <div className="space-y-4">
                        {revenueChart?.map((month, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-600">{month.month}</span>
                                    <span className="text-sm font-bold text-gray-900">Rp {month.revenue?.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full transition-all"
                                        style={{ width: `${month.percentage || 0}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
