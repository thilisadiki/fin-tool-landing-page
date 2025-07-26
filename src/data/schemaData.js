import { faqs } from '@/data/landingPageData';

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Quick Money Tool",
    "url": "https://www.quickmoneytool.com", 
    "description": "Free, accurate financial calculators for South Africa. Simplify your SARS income tax, vehicle finance, and retirement savings planning with our easy-to-use online tools.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.quickmoneytool.com/search?q={search_term_string}", //
      "query-input": "required name=search_term_string"
    },
    "mainEntity": [
      {
        "@type": "WebPage",
        "name": "SARS Income Tax Calculator",
        "url": "https://taxcalc.quickmoneytool.com/" 
      },
      {
        "@type": "WebPage",
        "name": "Vehicle Finance Calculator",
        "url": "https://drive.quickmoneytool.com/" 
      },
      {
        "@type": "WebPage",
        "name": "Retirement Savings Calculator",
        "url": "https://retire.quickmoneytool.com/" 
      },
      {
        "@type": "WebPage",
        "name": "Personal Loan Calculator",
        "url": "https://loan.quickmoneytool.com/" 
      },
      {
        "@type": "WebPage",
        "name": "Budget Calculator",
        "url": "https://budget.quickmoneytool.com/" 
      },
      {
        "@type": "WebPage",
        "name": "Currency Conversion",
        "url": "https://convert.quickmoneytool.com/" 
      }
    ]
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