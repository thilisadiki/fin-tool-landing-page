import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative px-6 py-20 overflow-hidden bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 from-slate-50 via-purple-100 to-indigo-100">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Free Financial Calculators for
            <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"> South Africa </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Simplify your finances with Quick Money Tool. Get instant, accurate calculations for SARS income tax, vehicle finance, and retirement savings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white dark:text-white px-8 py-4 text-lg"
              onClick={() => document.getElementById('tools').scrollIntoView({ behavior: 'smooth' })}
            >
              View All Calculators
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg"
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;