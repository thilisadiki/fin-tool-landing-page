'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

function NavAnchor({ hash, children }: { hash: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const href = pathname === '/' ? hash : `/${hash}`;

  return (
    <a href={href} className="hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors">
      {children}
    </a>
  );
}

const Header = () => {
  return (
    <header className="relative z-20 px-6 py-4 backdrop-blur-sm bg-background/50 sticky top-0 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] rounded-lg flex items-center justify-center border border-[#C9A84C]/30">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Quick Money Tool</span>
          </Link>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-6"
        >
          <Link href="/calculators" className="hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors">Calculators</Link>
          <NavAnchor hash="#about">About</NavAnchor>
          <NavAnchor hash="#faq">FAQ</NavAnchor>
          <Link href="/blog" className="hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
          <ThemeToggle />
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;
