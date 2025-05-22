import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({
    title = "Khata Manager - Business Account Management",
    description = "Manage your business transactions, track expenses, and keep your accounts organized with our easy-to-use platform.",
    keywords = "khata, business management, accounting, expense tracking, financial management",
    ogImage = "/og-image.jpg",
    ogUrl = "https://khata-manager.com",
    twitterHandle = "@khata_manager",
}) => {
    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="author" content="Khata Manager" />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Khata Manager" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Additional Meta Tags */}
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <link rel="canonical" href={ogUrl} />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Helmet>
    );
};

export default SEO;
