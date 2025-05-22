import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({
    title = "Khata - Smart Expense Management",
    description = "Manage your daily expenses effortlessly with Khata. Track, analyze, and optimize your spending with our intuitive expense management platform.",
    keywords = "expense management, daily expenses, financial tracking, budget management, expense tracker, money management, kahata, manager, expense, tracker, money, management",
    image = "/khata-logo.png",
    url = "https://khata-manager.netlify.app",
}) => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Khata",
        description: description,
        url: url,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        featureList: [
            "Expense Tracking",
            "Budget Management",
            "Financial Analytics",
            "User-friendly Interface",
        ],
        screenshot: image,
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        softwareVersion: "1.0.0",
    };

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Additional Meta Tags */}
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
