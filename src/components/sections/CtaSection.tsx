import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Section from '@/components/ui/Section';

const CtaSection = () => {
    return (
        <Section
          className="bg-gradient-to-r from-emerald-500 to-blue-600"
          maxWidth="max-w-4xl"
          containerClassName="text-center"
        >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Start using our free finance calculators today and make smarter, more informed decisions about your money.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-slate-200 px-8 py-4 text-lg"
                  onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Calculating Now
                </Button>
              </div>
            </motion.div>
        </Section>
    );
};

export default CtaSection;
