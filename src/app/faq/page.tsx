import Link from 'next/link';
import { HelpCircle, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Section from '@/components/ui/Section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/data/landingPageData';
import { faqSchema } from '@/data/schemaData';
import { buildBreadcrumbSchema } from '@/data/calculatorSchemaData';

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'FAQ', url: '/faq' },
];

const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <section className="px-6 py-16 bg-gradient-to-br dark:from-[#070f1a] dark:via-[#0F2744] dark:to-[#070f1a] from-slate-50 via-[#eef2f7] to-[#e6ecf4]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#C9A84C]/30">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Straight answers about how Quick Money Tool works, how calculators are
            reviewed, and what to expect from the site.
          </p>
        </div>
      </section>

      <Section maxWidth="max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={faq.question}
              className="border-b border-border"
            >
              <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:text-[#C9A84C] hover:no-underline data-[state=open]:text-foreground dark:hover:text-[#D4B96A]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-[1.7] text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section className="pt-0" maxWidth="max-w-4xl">
        <div className="rounded-2xl border border-border bg-accent/30 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Need something more specific?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Browse the full calculator hub, learn more about the team, or send a note if
            you found a bug or want a new tool.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0F2744] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A5F]"
            >
              Explore calculators
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background"
            >
              About Quick Money Tool
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background"
            >
              Contact us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
