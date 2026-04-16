import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from '@/components/ui/Section';
import { faqs } from '@/data/landingPageData';

const FaqSection = () => {
    return (
        <Section id="faq" maxWidth="max-w-4xl">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
              <HelpCircle className="mx-auto h-12 w-12 text-emerald-400 mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions? We've got answers. Here are some common queries about our finance calculators.
              </p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-200">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
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
