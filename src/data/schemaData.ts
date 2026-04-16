import { faqs, tools } from '@/data/landingPageData';

const BASE_URL = 'https://www.quickmoneytool.com';

function resolveToolUrl(tool: { url: string; isInternal?: boolean }): string {
  return tool.isInternal ? `${BASE_URL}${tool.url}` : tool.url;
}

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Quick Money Tool",
    "url": BASE_URL,
    "description": "Free, accurate financial calculators for South Africa. Simplify your SARS income tax, vehicle finance, and retirement savings planning with our easy-to-use online tools.",
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
