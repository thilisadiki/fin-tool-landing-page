import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import { features } from '@/data/landingPageData';

const AboutSection = () => {
    return (
        <Section id="about" className="bg-accent/30" containerClassName="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700 fill-mode-both">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    More Than Just Calculators
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                    Quick Money Tool is a personal finance guide built for real South African situations. From understanding your SARS tax return to budgeting on a South African salary, we combine free calculators with research-based guides and resources to help you make confident financial decisions.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                    Every tool and guide on this site is reviewed by{' '}
                    <Link href="/authors/ndulamiso-mamburu" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">Ndulamiso Mamburu</Link>,
                    a qualified Tax Professional working at{' '}
                    <a href="https://www.sars.gov.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS</a>.
                    Our content is grounded in current{' '}
                    <a href="https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARS tax tables</a>,{' '}
                    <a href="https://www.ncr.org.za/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">NCR</a>{' '}
                    regulations, and{' '}
                    <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]">SARB</a>{' '}
                    data, so you can trust the numbers.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                    Whether you are planning for your first car, filing provisional tax, or figuring out how to save more each month, we are here to guide you through it.
                </p>
                <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#B8943E] dark:text-[#D4B96A] dark:hover:text-[#E5CF9A] font-semibold transition-colors group"
                >
                    Learn more about us
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-700 fill-mode-both delay-200">
                {features.map((feature) => (
                    <div key={feature.title} className="text-left group">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#C9A84C]/15 to-[#0F2744]/15 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <feature.icon className="w-8 h-8 text-[#C9A84C]" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default AboutSection;
