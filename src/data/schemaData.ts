import { faqs, tools } from '@/data/landingPageData';

const BASE_URL = 'https://www.quickmoneytool.com';

function resolveToolUrl(tool: { url: string; isInternal?: boolean }): string {
  return tool.isInternal ? `${BASE_URL}${tool.url}` : tool.url;
}

export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Quick Money Tool",
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/logo-512-512.png`,
      "width": 512,
      "height": 512,
    },
    "sameAs": [
      "https://facebook.com/quickmoneytool",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@quickmoneytool.com",
      "contactType": "customer support",
      "areaServed": "ZA",
      "availableLanguage": ["en"],
    },
  };

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "name": "Quick Money Tool",
    "url": BASE_URL,
    "description": "Free, accurate financial calculators for South Africa. Simplify your SARS income tax, vehicle finance, and retirement savings planning with our easy-to-use online tools.",
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "inLanguage": "en-ZA",
    "mainEntity": tools.map(tool => ({
      "@type": "WebPage",
      "name": tool.title,
      "url": resolveToolUrl(tool),
    })),
  };

  export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
