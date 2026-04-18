'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

type NavLink =
  | { label: string; kind: 'route'; href: string }
  | { label: string; kind: 'hash'; hash: string };

const navLinks: NavLink[] = [
  { label: 'Calculators', kind: 'route', href: '/calculators' },
  { label: 'About', kind: 'hash', hash: '#about' },
  { label: 'FAQ', kind: 'hash', hash: '#faq' },
  { label: 'Blog', kind: 'route', href: '/blog' },
];

function resolveHref(link: NavLink, pathname: string): string {
  if (link.kind === 'route') return link.href;
  return pathname === '/' ? link.hash : `/${link.hash}`;
}

function NavItem({
  link,
  variant,
  onNavigate,
}: {
  link: NavLink;
  variant: 'desktop' | 'mobile';
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const href = resolveHref(link, pathname);

  const desktopClass =
    'hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors';
  const mobileClass =
    'block px-4 py-3 rounded-lg text-base text-foreground hover:bg-accent transition-colors';
  const className = variant === 'desktop' ? desktopClass : mobileClass;

  if (link.kind === 'route') {
    return (
      <Link href={href} onClick={onNavigate} className={className}>
        {link.label}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onNavigate} className={className}>
      {link.label}
    </a>
  );
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const toggle = toggleRef.current;

    const getFocusable = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panel &&
        !panel.contains(target) &&
        toggle &&
        !toggle.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = 'hidden';

    window.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClickOutside);
      style.overflow = previousOverflow;
      toggle?.focus();
    };
  }, [isOpen]);

  return (
    <header className="relative z-50 px-6 py-4 backdrop-blur-sm bg-background/50 sticky top-0 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
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
          {navLinks.map((link) => (
            <NavItem key={link.label} link={link} variant="desktop" />
          ))}
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-accent transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="md:hidden absolute left-0 right-0 top-full z-30 border-b border-border bg-slate-100 dark:bg-slate-800 shadow-lg"
          >
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavItem
                  key={link.label}
                  link={link}
                  variant="mobile"
                  onNavigate={closeMenu}
                />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;