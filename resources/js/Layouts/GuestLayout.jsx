import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Meta } from '@/Components/Meta';

export default function GuestLayout({ children, settings = {} }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const companyName = settings?.company_name || 'RenCar';
    const phone = settings?.phone || '+62 812-3456-7890';
    const email = settings?.email || 'info@rencar.id';
    const address = settings?.address || 'Jakarta, Indonesia';

    return (
        <>
            <Meta title={`${companyName} - Car Rental SaaS`} description="Book cars easily with our rental service" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Tawk.to Live Chat */}
                {typeof window !== 'undefined' && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                                (function(){
                                    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                                    s1.async=true;
                                    s1.src='https://embed.tawk.to/6698b8e79d6b8a39739b5f4e/1i4j36u2s';
                                    s1.charset='UTF-8';
                                    s1.setAttribute('crossorigin','*');
                                    s0.parentNode.insertBefore(s1,s0);
                                })();
                            `,
                        }}
                    />
                )}

                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-gray-900">{companyName}</span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Beranda</Link>
                                <Link href="/katalog" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Katalog</Link>
                                <Link href="/booking" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Booking</Link>
                                <Link href="/cek-status" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Cek Status</Link>
                                <Link 
                                    href="/login" 
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                                >
                                    Login Admin
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <button 
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        {mobileMenuOpen && (
                            <div className="md:hidden py-4 border-t border-gray-200">
                                <div className="flex flex-col space-y-3">
                                    <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-2 py-2">Beranda</Link>
                                    <Link href="/katalog" className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-2 py-2">Katalog</Link>
                                    <Link href="/booking" className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-2 py-2">Booking</Link>
                                    <Link href="/cek-status" className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-2 py-2">Cek Status</Link>
                                    <Link href="/login" className="text-blue-600 hover:text-blue-700 transition-colors font-medium px-2 py-2">Login Admin</Link>
                                </div>
                            </div>
                        )}
                    </nav>
                </header>

                {/* Main Content */}
                <main>
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Company Info */}
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-bold text-white">{companyName}</span>
                                </div>
                                <p className="text-gray-400 mb-4">Solusi rental mobil terpercaya untuk perjalanan Anda. Armada lengkap, harga kompetitif, pelayanan profesional.</p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-white font-semibold mb-4">Menu</h3>
                                <ul className="space-y-2">
                                    <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
                                    <li><Link href="/katalog" className="hover:text-white transition-colors">Katalog</Link></li>
                                    <li><Link href="/booking" className="hover:text-white transition-colors">Booking</Link></li>
                                    <li><Link href="/cek-status" className="hover:text-white transition-colors">Cek Status</Link></li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="text-white font-semibold mb-4">Kontak</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start space-x-2">
                                        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>{phone}</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>{email}</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{address}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
