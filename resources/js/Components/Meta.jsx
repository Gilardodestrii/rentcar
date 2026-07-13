import { Head } from '@inertiajs/react';

export function Meta({ 
    title = 'Rentivo - Sistem Manajemen Rental Mobil SaaS', 
    description = 'Rentivo adalah solusi SaaS terbaik untuk bisnis rental mobil Anda. Kelola armada, pemesanan, dan pembayaran dengan mudah.',
    ogImage = 'https://rentivo.my.id/images/og-image.jpg',
    canonical = 'https://rentivo.my.id',
    keywords = 'rental mobil, saas, manajemen rental, sistem rental mobil, software rental mobil'
}) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Rentivo" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Rentivo" />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@RentivoID" />
      <meta name="twitter:creator" content="@RentivoID" />
      
      {/* Canonical */}
      <link rel="canonical" href={canonical} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rentivo",
            "url": "https://rentivo.my.id",
            "logo": "https://rentivo.my.id/images/logo.png",
            "description": "${description}",
            "foundingDate": "2024",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Jakarta",
              "addressCountry": "ID"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+62-812-3456-7890",
              "contactType": "customer service",
              "email": "info@rentivo.my.id"
            }
          }
        `}
      </script>
    </Head>
  );
}
