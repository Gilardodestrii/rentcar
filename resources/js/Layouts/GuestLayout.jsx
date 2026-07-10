import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href={route('public.home')} className="text-xl font-bold text-blue-600">
                                RenCar
                            </Link>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-8">
                            <Link 
                                href={route('public.home')}
                                className="text-gray-600 hover:text-gray-900 transition"
                            >
                                Beranda
                            </Link>
                            <Link 
                                href={route('public.catalog')}
                                className="text-gray-600 hover:text-gray-900 transition"
                            >
                                Armada
                            </Link>
                            <Link 
                                href={route('public.testimonials')}
                                className="text-gray-600 hover:text-gray-900 transition"
                            >
                                Testimoni
                            </Link>
                            <Link 
                                href={route('public.booking.check-status')}
                                className="text-gray-600 hover:text-gray-900 transition"
                            >
                                Cek Status
                            </Link>
                            <Link 
                                href={route('login')}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                            >
                                Login Admin
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button 
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu placeholder - could be expanded */}
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link 
                            href={route('public.home')}
                            className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                        >
                            Beranda
                        </Link>
                        <Link 
                            href={route('public.catalog')}
                            className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                        >
                            Armada
                        </Link>
                        <Link 
                            href={route('public.booking.check-status')}
                            className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                        >
                            Cek Status
                        </Link>
                        <Link 
                            href={route('login')}
                            className="block px-3 py-2 bg-blue-600 text-white text-center rounded-md mt-2"
                        >
                            Login Admin
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">RenCar</h3>
                            <p className="text-sm">Sistem rental mobil profesional dengan armada terawat dan layanan terbaik.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Tautan</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href={route('public.catalog')} className="hover:text-white transition">Katalog Armada</Link></li>
                                <li><Link href={route('public.booking')} className="hover:text-white transition">Booking Online</Link></li>
                                <li><Link href={route('public.booking.check-status')} className="hover:text-white transition">Cek Status Booking</Link></li>
                                <li><Link href={route('public.testimonials')} className="hover:text-white transition">Testimoni</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Kontak</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>+62 xxx-xxxx-xxxx</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>info@rencar.com</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Ikuti Kami</h4>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-white transition">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="hover:text-white transition">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} RenCar. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
