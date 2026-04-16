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

export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${BASE_URL}/about#aboutpage`,
  "url": `${BASE_URL}/about`,
  "name": "About Quick Money Tool",
  "description":
    "Learn about Quick Money Tool: a small, independent South African team building free, accurate, privacy-first financial calculators for SARS tax, vehicle finance, personal loans, retirement, and budgeting.",
  "inLanguage": "en-ZA",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "about": { "@id": `${BASE_URL}/#organization` },
  "mainEntity": { "@id": `${BASE_URL}/#organization` },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "About", "item": `${BASE_URL}/about` },
    ],
  },
};

export function buildPrivacyPolicySchema(lastReviewedIso: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/privacy-policy#webpage`,
    "url": `${BASE_URL}/privacy-policy`,
    "name": "Privacy Policy",
    "description":
      "How Quick Money Tool handles your data. All calculator inputs are processed in your browser and never transmitted to our servers.",
    "inLanguage": "en-ZA",
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": { "@id": `${BASE_URL}/#organization` },
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "lastReviewed": lastReviewedIso,
    "dateModified": lastReviewedIso,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": `${BASE_URL}/privacy-policy` },
      ],
    },
  };
}

export function buildTermsOfServiceSchema(lastReviewedIso: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/terms-of-service#webpage`,
    "url": `${BASE_URL}/terms-of-service`,
    "name": "Terms of Service",
    "description":
      "The terms of use for Quick Money Tool's free South African financial calculators. Informational estimates only, not a substitute for professional financial advice.",
    "inLanguage": "en-ZA",
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": { "@id": `${BASE_URL}/#organization` },
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "lastReviewed": lastReviewedIso,
    "dateModified": lastReviewedIso,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": `${BASE_URL}/terms-of-service` },
      ],
    },
  };
}

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${BASE_URL}/contact#contactpage`,
  "url": `${BASE_URL}/contact`,
  "name": "Contact Quick Money Tool",
  "description":
    "Contact the Quick Money Tool team with questions, bug reports, feature requests, or feedback on our South African financial calculators.",
  "inLanguage": "en-ZA",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "about": { "@id": `${BASE_URL}/#organization` },
  "mainEntity": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Quick Money Tool",
    "url": BASE_URL,
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "hello@quickmoneytool.com",
        "contactType": "customer support",
        "areaServed": "ZA",
        "availableLanguage": ["en"],
      },
    ],
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${BASE_URL}/contact` },
    ],
  },
};
