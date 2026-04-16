'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import Section from '@/components/ui/Section';

const LAST_UPDATED = 'April 16, 2026';

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 from-slate-50 via-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <Section maxWidth="max-w-3xl">
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <div className="p-5 rounded-xl dark:bg-amber-950/30 bg-amber-50 border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-muted-foreground leading-relaxed m-0">
              <strong className="text-foreground">In short:</strong> Quick Money Tool provides free financial estimation tools. Our calculators are for informational purposes only and are not a substitute for professional financial advice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Quick Money Tool (&quot;the Site&quot;), located at <strong>www.quickmoneytool.com</strong>, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree with any part of these Terms, you should not use the Site.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Quick Money Tool provides free, browser-based financial calculators for informational and estimation purposes. Our tools include, but are not limited to, income tax calculators, vehicle finance calculators, personal loan calculators, retirement savings calculators, budget planners, and currency converters tailored for the South African market.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">3. No Financial Advice</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The content and results provided by our calculators are for <strong className="text-foreground">estimation and informational purposes only</strong>. They do not constitute:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Professional financial advice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Tax advice or tax return preparation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Investment guidance or portfolio recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Legal or accounting services</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              For personal financial decisions, tax filings, or investment strategies, we strongly recommend consulting a registered South African financial advisor, tax practitioner, or accountant.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">4. Accuracy of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we make every effort to ensure that our calculators use accurate and up-to-date data (including current SARS tax brackets and prevailing interest rates), we do not guarantee the accuracy, completeness, or reliability of any calculation results. Tax laws, regulations, and interest rates are subject to change, and there may be a delay between when changes are announced and when our tools are updated.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Quick Money Tool, its owner, developers, and contributors shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of, or inability to use, the Site or its calculator tools. This includes, but is not limited to, financial losses, tax penalties, or incorrect financial decisions made based on calculator results.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on the Site, including but not limited to text, design, graphics, logos, code, and calculator logic, is the intellectual property of Quick Money Tool and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">7. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Site uses third-party services including Google Analytics, Google AdSense, and Vercel for hosting and analytics. These services have their own terms of service and privacy policies. We are not responsible for the practices of these third-party providers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">8. Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to keep the Site available at all times, but we do not guarantee uninterrupted access. The Site may be temporarily unavailable due to maintenance, updates, or issues beyond our control.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">9. Modifications to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to update or modify these Terms at any time without prior notice. Changes will be effective immediately upon posting to this page with an updated &quot;Last updated&quot; date. Continued use of the Site after any modifications constitutes your acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:hello@quickmoneytool.com" className="text-foreground underline hover:text-amber-500 transition-colors">
                hello@quickmoneytool.com
              </a>{' '}
              or visit our{' '}
              <Link href="/contact" className="text-foreground underline hover:text-amber-500 transition-colors">
                Contact page
              </Link>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
