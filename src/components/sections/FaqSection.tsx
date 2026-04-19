import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Section from '@/components/ui/Section';
import { faqs } from '@/data/landingPageData';

const FaqSection = () => {
  return (
    <Section id="faq" maxWidth="max-w-3xl">
      <div className="mb-14 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#C9A84C]/10 px-3 py-[5px] text-xs font-bold uppercase tracking-wider text-[#C9A84C] dark:text-[#D4B96A]">
          FAQ
        </div>
        <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-tight text-foreground">
          Common questions
        </h2>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-200">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border-b border-border">
              <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:text-[#C9A84C] hover:no-underline data-[state=open]:text-foreground dark:hover:text-[#D4B96A]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-[1.7] text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
};

export default FaqSection;
