'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buildPrivacyPolicySchema } from '@/data/schemaData';

const LAST_UPDATED = 'April 16, 2026';
const LAST_UPDATED_ISO = '2026-04-16';
const privacyPolicySchema = buildPrivacyPolicySchema(LAST_UPDATED_ISO);
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Privacy Policy', url: '/privacy-policy' },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicySchema) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 from-slate-50 via-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#C9A84C]/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
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
          <div className="p-5 rounded-xl dark:bg-[#C9A84C]/5 bg-[#C9A84C]/5 border border-[#C9A84C]/20">
            <p className="text-sm text-muted-foreground leading-relaxed m-0">
              <strong className="text-foreground">In short:</strong> Quick Money Tool processes all calculations directly in your browser. We do not collect, store, or transmit your personal financial data to any server.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Quick Money Tool (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). This Privacy Policy explains how we collect, use, and protect information when you visit our website at <strong>www.quickmoneytool.com</strong> (the &quot;Site&quot;). We are committed to protecting your privacy and being transparent about our data practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">2. Information We Do NOT Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Our financial calculators are designed to run entirely within your web browser. This means:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#C9A84C] mt-1">•</span>
                <span>Your income, salary, tax, loan, and savings figures <strong className="text-foreground">never leave your device</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A84C] mt-1">•</span>
                <span>We do not store calculation inputs or results on any server.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A84C] mt-1">•</span>
                <span>We do not require you to create an account or log in.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">3. Information We May Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              While we do not collect personal financial data, we may collect limited, non-identifying information through third-party services to help us improve the Site:
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">a) Analytics (Vercel Analytics &amp; Google Analytics)</h3>
            <p className="text-muted-foreground leading-relaxed">
              We use Vercel Analytics and Google Analytics to understand general usage patterns such as page views, visitor count, referral sources, and device types. These services may use cookies or similar technologies. The data collected is aggregated and does not personally identify you.
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">b) Advertising (Google AdSense)</h3>
            <p className="text-muted-foreground leading-relaxed">
              We display advertisements through Google AdSense to support the free operation of the Site. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-[#C9A84C] transition-colors">Google Ads Settings</a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">4. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Site may use cookies set by third-party services (Google Analytics, Google AdSense). These cookies help measure site traffic and serve relevant advertisements. You can control or disable cookies through your browser settings. Please note that disabling cookies may affect certain functionality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">5. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Site may contain links to external websites or services. We are not responsible for the privacy practices or content of those third-party sites. We encourage you to review their privacy policies before sharing any personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Since all financial calculations occur locally in your browser, there is no server-side data to breach. Our website is served over HTTPS, ensuring that your connection to the Site is encrypted.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">7. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Site is not directed at children under the age of 13 and we do not knowingly collect information from children.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">8. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this page periodically.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">9. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:hello@quickmoneytool.com" className="text-foreground underline hover:text-[#C9A84C] transition-colors">
                hello@quickmoneytool.com
              </a>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
