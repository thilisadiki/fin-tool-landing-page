'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, Shield, TrendingUp, Users, Heart, Target, Zap, Linkedin, UserCheck } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { aboutPageSchema, organizationSchema } from '@/data/schemaData';
import { ndulamiso, buildPersonSchema } from '@/data/authors';

const reviewerPersonSchema = buildPersonSchema(ndulamiso);

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
];

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
    description: 'Our calculators and guides are kept up-to-date with the latest SARS tax brackets, lending rates, and financial regulations for South Africa. See sars.gov.za for current figures.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Zap,
    title: '100% Free',
    description: 'Every tool and guide on Quick Money Tool is completely free to use, with no hidden sign-ups, subscriptions, or paywalls.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Heart,
    title: 'Built for South Africans',
    description: 'Our tools and guides are designed specifically for the South African financial landscape, covering local tax rules, ZAR formatting, and real-world SA situations.',
    color: 'from-pink-500 to-rose-600',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewerPersonSchema) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

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
              Your personal finance guide for South Africa. Free calculators, research-based guides, and practical money advice for real situations.
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
              Quick Money Tool was created with a simple goal: to make personal finance accessible to every South African. Many people struggle with tax deductions, loan repayments, and retirement projections, not because of a lack of intelligence, but because of a lack of accessible tools and plain-language guidance.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That&apos;s why we built a suite of free calculators alongside research-based guides and resources that address real financial situations in South Africa. No sign-ups, no paywalls, and no jargon.
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
              Quick Money Tool is a small, independent team based in South Africa. We are not just a calculator site. We are a personal finance guide that combines free tools with research-based content written for real South African situations. Every calculator, guide, and article is reviewed by{' '}
              <Link href="/authors/ndulamiso-mamburu" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">Ndulamiso Mamburu</Link>,
              a qualified Tax Professional working at{' '}
              <a href="https://www.sars.gov.za" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">SARS</a>.
              We source our data from authorities like SARS, the{' '}
              <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">South African Reserve Bank</a>,{' '}
              and the{' '}
              <a href="https://www.ncr.org.za" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">National Credit Regulator</a>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are not affiliated with any bank, lender, or government body. Our tools, guides, and recommendations are independent, unbiased, and designed to serve you first.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Reviewer */}
      <Section maxWidth="max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <UserCheck className="w-3.5 h-3.5" />
            Reviewed by a professional
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">Meet our technical reviewer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every SARS, tax, retirement and personal finance calculator on this site is reviewed against current South African tax tables and regulatory guidance.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white dark:bg-slate-800/50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            <div
              aria-hidden="true"
              className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shrink-0"
            >
              {ndulamiso.name
                .split(' ')
                .slice(0, 2)
                .map((part) => part[0])
                .join('')}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-1">{ndulamiso.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {ndulamiso.jobTitle} at{' '}
                {ndulamiso.affiliation.url ? (
                  <a
                    href={ndulamiso.affiliation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground"
                  >
                    {ndulamiso.affiliation.name}
                  </a>
                ) : (
                  ndulamiso.affiliation.name
                )}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {ndulamiso.credentials.map((credential) => (
                  <span
                    key={credential}
                    className="text-xs px-3 py-1 rounded-full bg-accent border border-border text-foreground"
                  >
                    {credential}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">{ndulamiso.shortBio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Link
                  href={`/authors/${ndulamiso.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-medium transition-colors"
                >
                  View full profile
                </Link>
                <a
                  href={ndulamiso.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-foreground text-sm font-medium transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
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
            Quick Money Tool provides estimations and projections for informational purposes only. Our calculators are not a substitute for professional financial advice. For complex tax matters, investment decisions, or significant financial commitments, we strongly recommend consulting with a registered South African financial advisor or tax practitioner.{' '}
            <Link href="/disclaimer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500">
              Read our full disclaimer
            </Link>.
          </p>
        </div>
      </Section>
    </>
  );
}
