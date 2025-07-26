import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
    return (
        <section className="px-6 py-20 bg-gradient-to-r from-emerald-500 to-blue-600">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Take Control of Your Finances?
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Start using our free financial calculators today and make smarter, more informed decisions about your money.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-emerald-600 hover:bg-slate-200 px-8 py-4 text-lg"
                    onClick={() => document.getElementById('tools').scrollIntoView({ behavior: 'smooth' })}
                  >
                    Start Calculating Now
                  </Button>
                </div>
              </motion.div>
            </div>
        </section>
    );
};

export default CtaSection;