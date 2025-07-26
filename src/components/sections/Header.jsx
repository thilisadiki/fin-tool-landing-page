import React from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Header = () => {
  return (
    <header className="relative z-20 px-6 py-4 backdrop-blur-sm bg-background/50 sticky top-0 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">Quick Money Tool</span>
        </motion.a>
        
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-6"
        >
          <a href="#tools" className="hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors">Calculators</a>
          <a href="#about" className="hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#faq" className="hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          <ThemeToggle />
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;