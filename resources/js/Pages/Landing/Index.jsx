import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, StarIcon, PlayCircleIcon, ChevronDownIcon, ChevronUpIcon, EnvelopeIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/solid';

export default function Landing() {
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscribeSuccess, setSubscribeSuccess] = useState(false);

    const features = [
        { name: 'Multi-Tenant SaaS', description: 'Setiap pelanggan mendapatkan sistem terpisah dengan domain sendiri', icon: GlobeAltIcon },
        { name: 'Manajemen Armada', description: 'Kelola semua kendaraan dengan mudah dan terorganisir', icon: CheckCircleIcon },
        { name: 'Pemesanan Online', description: 'Sistem pemesanan otomatis dengan kalender dan pembayaran', icon: CheckCircleIcon },
        { name: 'Dashboard Analytics', description: 'Laporan penuh dengan grafik dan statistik bisnis', icon: CheckCircleIcon },
        { name: 'Mobile-Friendly', description: 'Akses dari mana saja dengan tampilan responsif', icon: CheckCircleIcon },
        { name: '24/7 Support', description: 'Tim support siap membantu kapan saja', icon: CheckCircleIcon },
    ];

    const pricingPlans = [
        {
            name: 'Starter',
            price: 'Rp 299.000',
            period: '/bulan',
            features: [
                '1 Domain Tenant',
                '10 Kendaraan',
                '100 Pemesanan/Bulan',
                'Dashboard Basic',
                'Email Support',
            ],
            excluded: ['Custom Domain', 'API Access', 'Priority Support'],
            popular: false,
            buttonText: 'Mulai Sekarang',
            buttonColor: 'bg-gray-600 hover:bg-gray-700',
        },
        {
            name: 'Professional',
            price: 'Rp 799.000',
            period: '/bulan',
            features: [
                '5 Domain Tenant',
                '50 Kendaraan',
                '1000 Pemesanan/Bulan',
                'Dashboard Advanced',
                'Email & Chat Support',
                'Custom Domain',
            ],
            excluded: ['API Access', 'Priority Support'],
            popular: true,
            buttonText: 'Pilih Paket',
            buttonColor: 'bg-blue-600 hover:bg-blue-700',
        },
        {
            name: 'Enterprise',
            price: 'Rp 1.999.000',
            period: '/bulan',
            features: [
                'Unlimited Domain Tenant',
                'Unlimited Kendaraan',
                'Unlimited Pemesanan',
                'Dashboard Full Feature',
                'Email, Chat & Phone Support',
                'Custom Domain',
                'API Access',
                'Priority Support',
            ],
            excluded: [],
            popular: false,
            buttonText: 'Kontak Sales',
            buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
        },
    ];

    const testimonials = [
        {
            quote: '"Sistemnya sangat mudah digunakan dan membantu bisnis rental kami tumbuh 300% dalam 6 bulan."',
            name: 'Budi Santoso',
            title: 'Pemilik RentCar Jakarta',
            rating: 5,
        },
        {
            quote: '"Support timnya sangat responsif. Masalah kami selalu terselesaikan dalam hitungan jam."',
            name: 'Siti Aisyah',
            title: 'Manager CV. Transportasi Sejahtera',
            rating: 5,
        },
        {
            quote: '"Fitur manajemen armada dan laporan keuangannya sangat lengkap. Sangat direkomendasikan!"',
            name: 'Agus Wibowo',
            title: 'Direktur PT. Sewa Mobil Nusantara',
            rating: 5,
        },
    ];

    const faqs = [
        {
            question: 'Apa itu Rentivo?',
            answer: 'Rentivo adalah platform SaaS (Software as a Service) yang dirancang khusus untuk bisnis rental mobil. Kami menyediakan sistem manajemen lengkap dengan fitur-fitur profesional untuk membantu Anda mengelola bisnis rental mobil secara efisien.',
        },
        {
            question: 'Bagaimana cara mendaftar?',
            answer: 'Anda dapat mendaftar dengan mengisi formulir pendaftaran di halaman ini. Setelah pendaftaran, Anda akan mendapatkan akses ke dashboard admin dan domain tenant khusus untuk bisnis Anda.',
        },
        {
            question: 'Apakah ada trial gratis?',
            answer: 'Ya, kami menawarkan trial gratis selama 7 hari untuk semua paket. Anda dapat mencoba semua fitur tanpa kewajiban untuk berlangganan.',
        },
        {
            question: 'Bagaimana sistem pembayarannya?',
            answer: 'Pembayaran dapat dilakukan melalui transfer bank, kartu kredit, atau melalui payment gateway Pakasir yang kami sediakan.',
        },
        {
            question: 'Apakah data kami aman?',
            answer: 'Keamanan data adalah prioritas utama kami. Kami menggunakan enkripsi SSL, backup otomatis, dan sistem keamanan multi-layer untuk melindungi data bisnis Anda.',
        },
    ];

    const blogPosts = [
        {
            title: 'Cara Meningkatkan Pendapatan Rental Mobil dengan Sistem Online',
            excerpt: 'Temukan strategi efektif untuk meningkatkan pendapatan bisnis rental mobil Anda menggunakan sistem pemesanan online.',
            date: '15 Juli 2026',
            author: 'Tim Rentivo',
            slug: '/blog/cara-meningkatkan-pendapatan',
        },
        {
            title: 'Panduan Lengkap Manajemen Armada untuk Pemula',
            excerpt: 'Panduan step-by-step untuk mengelola armada kendaraan rental Anda dengan efisien dan profesional.',
            date: '10 Juli 2026',
            author: 'Budi Santoso',
            slug: '/blog/panduan-manajemen-armada',
        },
        {
            title: '5 Fitur Wajib yang Harus Ada di Sistem Rental Mobil',
            excerpt: 'Temukan 5 fitur penting yang harus ada di sistem manajemen rental mobil untuk kesuksesan bisnis Anda.',
            date: '5 Juli 2026',
            author: 'Siti Aisyah',
            slug: '/blog/5-fitur-wajib',
        },
    ];

    const clientLogos = [
        { name: 'RentCar Jakarta', logo: 'https://via.placeholder.com/150x60/4F46E5/FFFFFF?text=RentCar+Jakarta' },
        { name: 'CV. Transportasi Sejahtera', logo: 'https://via.placeholder.com/150x60/10B981/FFFFFF?text=Transportasi+Sejahtera' },
        { name: 'PT. Sewa Mobil Nusantara', logo: 'https://via.placeholder.com/150x60/F59E0B/FFFFFF?text=Sewa+Mobil+Nusantara' },
        { name: 'Rental Cepat', logo: 'https://via.placeholder.com/150x60/EF4444/FFFFFF?text=Rental+Cepat' },
        { name: 'Mobil Sehat', logo: 'https://via.placeholder.com/150x60/8B5CF6/FFFFFF?text=Mobil+Sehat' },
        { name: 'Sewa Kilat', logo: 'https://via.placeholder.com/150x60/06B6D4/FFFFFF?text=Sewa+Kilat' },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        slug: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        plan: 'professional',
        payment_method: 'trial',
    });

    const paymentMethods = [
        { id: 'trial', name: 'Coba Gratis (7 Hari)' },
        { id: 'transfer', name: 'Transfer Bank' },
        { id: 'bca', name: 'BCA' },
        { id: 'mandiri', name: 'Mandiri' },
        { id: 'bni', name: 'BNI' },
        { id: 'bri', name: 'BRI' },
        { id: 'qris', name: 'QRIS' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tenants.store'), {
            onSuccess: () => {
                reset();
                if (data.payment_method === 'trial') {
                    window.location.href = '/daftar?success=1';
                }
            },
            onError: () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        });
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setIsSubscribing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubscribing(false);
        setSubscribeSuccess(true);
        setNewsletterEmail('');
        setTimeout(() => setSubscribeSuccess(false), 5000);
    };

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <div>
            <Head title="Rentivo - Sistem Manajemen Rental Mobil SaaS" />
            <meta name="description" content="Rentivo adalah solusi SaaS terbaik untuk bisnis rental mobil Anda. Kelola armada, pemesanan, dan pembayaran dengan mudah." />
            <meta name="keywords" content="rental mobil, saas, manajemen rental, sistem rental mobil, software rental mobil" />
            <meta name="author" content="Rentivo" />
            <meta property="og:title" content="Rentivo - Sistem Manajemen Rental Mobil SaaS" />
            <meta property="og:description" content="Rentivo adalah solusi SaaS terbaik untuk bisnis rental mobil Anda. Kelola armada, pemesanan, dan pembayaran dengan mudah." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://rentivo.my.id" />
            <meta property="og:image" content="https://rentivo.my.id/images/og-image.jpg" />
            <meta property="og:site_name" content="Rentivo" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Rentivo - Sistem Manajemen Rental Mobil SaaS" />
            <meta name="twitter:description" content="Rentivo adalah solusi SaaS terbaik untuk bisnis rental mobil Anda." />
            <meta name="twitter:image" content="https://rentivo.my.id/images/og-image.jpg" />
            <link rel="canonical" href="https://rentivo.my.id" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Kelola Bisnis Rental Mobil 
                            <span className="text-blue-600">Lebih Mudah</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Rentivo adalah solusi SaaS (Software as a Service) untuk bisnis rental mobil Anda. 
                            Dengan sistem multi-tenant, setiap pelanggan mendapatkan akses terpisah dengan fitur lengkap.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="#pricing"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
                            >
                                Lihat Paket Harga
                            </Link>
                            <Link
                                href="#demo"
                                className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition"
                            >
                                Coba Demo Gratis
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Unggulan Rentivo</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Semua fitur yang Anda butuhkan untuk mengelola bisnis rental mobil secara profesional
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition group"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
                                    <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Demo Section */}
            <section id="demo" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Lihat Demo Rentivo</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Tonton video demo untuk melihat bagaimana Rentivo bekerja dan membantu bisnis Anda
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                                title="Demo Rentivo - Sistem Manajemen Rental Mobil"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilih Paket Subscription</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Mulai dari Rp 299.000 per bulan. Tidak ada biaya tersembunyi.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-8 shadow-lg border ${plan.popular ? 'ring-2 ring-blue-600 border-blue-600' : 'border-gray-200'}`}
                            >
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    {plan.popular && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                                            Populer
                                        </span>
                                    )}
                                    <div className="my-6">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-lg text-gray-500">{plan.period}</span>
                                    </div>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                    {plan.excluded.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <XCircleIcon className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="text-gray-400">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="#daftar"
                                    className={`w-full block text-center py-3 px-6 rounded-lg font-medium text-white transition ${plan.buttonColor}`}
                                >
                                    {plan.buttonText}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Dipercaya oleh Ribuan Bisnis</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Bergabunglah dengan ribuan bisnis rental mobil yang sudah menggunakan Rentivo
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                        {clientLogos.map((client, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-center">
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="h-12 object-contain grayscale hover:grayscale-0 transition"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa Kata Pelanggan Kami?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Ribuan bisnis rental mobil sudah percaya menggunakan Rentivo
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-8">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Preview Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Artikel Terbaru</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Baca artikel dan tips seputar bisnis rental mobil dari ahli kami
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <article key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6M7 8h6" />
                                    </svg>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <span>{post.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{post.author}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition">
                                        <Link href={post.slug}>{post.title}</Link>
                                    </h3>
                                    <p className="text-gray-600 text-sm">{post.excerpt}</p>
                                    <Link
                                        href={post.slug}
                                        className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                                    >
                                        Baca Selengkapnya
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
                        <p className="text-lg text-gray-600">
                            Temukan jawaban atas pertanyaan Anda seputar Rentivo
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-xl overflow-hidden shadow-sm"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition"
                                >
                                    <span className="font-semibold text-gray-900">{faq.question}</span>
                                    {expandedFaq === index ? (
                                        <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>
                                {expandedFaq === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Dapatkan Update Terbaru</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Berlangganan newsletter kami untuk mendapatkan tips, artikel, dan penawaran khusus
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="Masukkan email Anda"
                            className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 outline-none"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubscribing}
                            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubscribing ? 'Mendaftar...' : 'Berlangganan'}
                        </button>
                    </form>
                    {subscribeSuccess && (
                        <p className="mt-4 text-green-100 text-sm">Terima kasih! Email Anda telah terdaftar.</p>
                    )}
                </div>
            </section>

            {/* Registration Form Section */}
            <section id="daftar" className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Daftar Sekarang</h2>
                        <p className="text-lg text-gray-600">
                            Isi formulir di bawah ini untuk memulai bisnis rental mobil Anda dengan Rentivo
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Row 1: Company Name + Slug */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Perusahaan
                                    </label>
                                    <input
                                        id="company_name"
                                        type="text"
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="PT. Rental Mobil Sejahtera"
                                        required
                                    />
                                    {errors.company_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.company_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subdomain (tanpa spasi)
                                    </label>
                                    <div className="flex">
                                        <input
                                            id="slug"
                                            type="text"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                            placeholder="namaperusahaan"
                                            required
                                        />
                                        <span className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500">
                                            .rentivo.my.id
                                        </span>
                                    </div>
                                    {errors.slug && (
                                        <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                                    )}
                                </div>
                            </div>

                            {/* Row 2: Name + Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="John Doe"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="email@perusahaan.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            {/* Row 3: Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        No. Telepon
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="+62 812-3456-7890"
                                    />
                                </div>
                            </div>

                            {/* Row 4: Plan + Payment Method */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1">
                                        Pilih Paket
                                    </label>
                                    <select
                                        id="plan"
                                        value={data.plan}
                                        onChange={(e) => setData('plan', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    >
                                        <option value="starter">Starter - Rp 299.000/bulan</option>
                                        <option value="professional">Professional - Rp 799.000/bulan</option>
                                        <option value="enterprise">Enterprise - Rp 1.999.000/bulan</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">
                                        Metode Pembayaran
                                    </label>
                                    <select
                                        id="payment_method"
                                        value={data.payment_method}
                                        onChange={(e) => setData('payment_method', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    >
                                        {paymentMethods.map((method) => (
                                            <option key={method.id} value={method.id}>
                                                {method.name}
                                            </option>
                                        ))}
                                    </select>
                                    {data.payment_method !== 'trial' && (
                                        <p className="mt-1 text-xs text-gray-500">
                                            Anda akan diarahkan ke halaman pembayaran Pakasir
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Row 5: Password + Confirmation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Kata Sandi
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="Minimal 8 karakter"
                                        required
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                        Konfirmasi Kata Sandi
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="Konfirmasi kata sandi"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    Saya setuju dengan <Link href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</Link> dan <Link href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Mendaftar...' : 'Daftar Sekarang'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Siap Meningkatkan Bisnis Rental Anda?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Daftar sekarang dan dapatkan akses penuh ke semua fitur Rentivo selama 7 hari gratis!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="#daftar"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition"
                        >
                            Daftar Sekarang
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition"
                        >
                            <PhoneIcon className="w-5 h-5 mr-2" />
                            Hubungi Sales
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Rentivo</h3>
                            <p className="text-gray-400 mb-4">
                                Solusi SaaS untuk bisnis rental mobil terpercaya di Indonesia.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">WhatsApp</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c.003 5.45-4.437 9.884-9.885 9.884m-8.413-18.297a1.162 1.162 0 01.832 1.842 1.162 1.162 0 01-.832-1.842m8.417 18.297a1.162 1.162 0 01-.832-1.842 1.162 1.162 0 01.832 1.842" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Produk</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Fitur</a></li>
                                <li><a href="#pricing" className="text-gray-400 hover:text-white">Harga</a></li>
                                <li><a href="#demo" className="text-gray-400 hover:text-white">Demo</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Perusahaan</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Tentang Kami</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Kontak</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Bantuan</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Dokumentasi</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Rentivo. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
