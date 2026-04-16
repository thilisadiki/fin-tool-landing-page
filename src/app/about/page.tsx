'use client';

import { motion } from 'framer-motion';
import { Calculator, Shield, TrendingUp, Users, Heart, Target, Zap } from 'lucide-react';
import Section from '@/components/ui/Section';

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All calculations happen directly in your browser. We never see, store, or transmit your personal financial data.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: TrendingUp,
    title: 'Always Accurate',
    description: 'Our calculators are kept up-to-date with the latest SARS tax brackets, lending rates, and financial regulations for South Africa.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Zap,
    title: '100% Free',
    description: 'Every tool on Quick Money Tool is completely free to use, with no hidden sign-ups, subscriptions, or paywalls.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Heart,
    title: 'Built for South Africans',
    description: 'Our tools are designed specifically for the South African financial landscape, including ZAR formatting, local tax rules, and SA-relevant defaults.',
    color: 'from-pink-500 to-rose-600',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-20 bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 from-slate-50 via-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Quick Money Tool
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe that every South African deserves access to accurate, easy-to-use financial tools — no matter their background or income level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <Section maxWidth="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Quick Money Tool was created with a simple goal: to make financial planning accessible to everyone. We noticed that many South Africans struggle with understanding tax deductions, loan repayments, and retirement projections — not because of a lack of intelligence, but because of a lack of accessible tools.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That&apos;s why we built a suite of free, no-nonsense calculators that give you instant, accurate results without requiring you to create an account or hand over your personal information.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We are a small, independent team of developers and finance enthusiasts based in South Africa. We are passionate about technology and financial literacy, and we combine the two to build tools that genuinely help people make better financial decisions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Quick Money Tool is not affiliated with any bank, financial institution, or government body. Our recommendations are unbiased, and our tools are designed to serve you — the user — first and foremost.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-accent/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">What We Stand For</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These core values guide every calculator we build and every feature we ship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="dark:bg-slate-800/50 bg-white rounded-xl p-6 border border-border"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-4`}>
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Disclaimer */}
      <Section maxWidth="max-w-3xl">
        <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border text-center">
          <h3 className="text-lg font-semibold text-foreground mb-3">Important Disclaimer</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Quick Money Tool provides estimations and projections for informational purposes only. Our calculators are not a substitute for professional financial advice. For complex tax matters, investment decisions, or significant financial commitments, we strongly recommend consulting with a registered South African financial advisor or tax practitioner.
          </p>
        </div>
      </Section>
    </>
  );
}
