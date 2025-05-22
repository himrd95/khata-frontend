import React, { memo } from "react";
import { Helmet } from "react-helmet";

const SEO = memo(
    ({
        title = "Khata Manager - Business Account Management",
        description = "Manage your business transactions, track expenses, and keep your accounts organized with our easy-to-use platform.",
        keywords = "khata, business management, accounting, expense tracking, financial management",
        ogImage = "/og-image.jpg",
        ogUrl = "https://khata-manager.com",
        twitterHandle = "@khata_manager",
    }) => {
        const metaTags = [
            // Basic Meta Tags
            { name: "description", content: description },
            { name: "keywords", content: keywords },
            { name: "robots", content: "index, follow" },
            { name: "language", content: "English" },
            { name: "revisit-after", content: "7 days" },
            { name: "author", content: "Khata Manager" },

            // Open Graph Meta Tags
            { property: "og:title", content: title },
            { property: "og:description", content: description },
            { property: "og:image", content: ogImage },
            { property: "og:url", content: ogUrl },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "Khata Manager" },

            // Twitter Meta Tags
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:site", content: twitterHandle },
            { name: "twitter:title", content: title },
            { name: "twitter:description", content: description },
            { name: "twitter:image", content: ogImage },

            // Additional Meta Tags
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0",
            },
            { httpEquiv: "Content-Type", content: "text/html; charset=utf-8" },
        ];

        return (
            <Helmet>
                <title>{title}</title>
                {metaTags.map((tag, index) => (
                    <meta key={index} {...tag} />
                ))}
                <link rel="canonical" href={ogUrl} />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            </Helmet>
        );
    }
);

SEO.displayName = "SEO";

export default SEO;
