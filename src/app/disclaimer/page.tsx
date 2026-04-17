'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buildDisclaimerSchema } from '@/data/schemaData';

const LAST_UPDATED = 'April 17, 2026';
const LAST_UPDATED_ISO = '2026-04-17';
const disclaimerSchema = buildDisclaimerSchema(LAST_UPDATED_ISO);
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Disclaimer', url: '/disclaimer' },
];

export default function DisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(disclaimerSchema) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 from-slate-50 via-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Disclaimer
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
          <div className="p-5 rounded-xl dark:bg-rose-950/30 bg-rose-50 border border-rose-200 dark:border-rose-800">
            <p className="text-sm text-muted-foreground leading-relaxed m-0">
              <strong className="text-foreground">In short:</strong> Quick Money Tool provides free estimation tools for informational purposes only. Our calculators are not a substitute for professional financial, tax, or legal advice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">1. General Information Only</h2>
            <p className="text-muted-foreground leading-relaxed">
              The content, tools, and calculator results provided on Quick Money Tool (&quot;the Site&quot;), located at <strong>www.quickmoneytool.com</strong>, are for general informational and estimation purposes only. Nothing on this Site should be construed as professional financial advice, tax advice, investment guidance, or legal counsel.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">2. No Professional Advice</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Quick Money Tool is not a financial advisory service, tax consultancy, or legal firm. The use of our calculators does not create a professional-client relationship. Our tools do not replace:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-1">&bull;</span>
                <span>A registered South African financial advisor (FSP-licensed)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-1">&bull;</span>
                <span>A SARS-registered tax practitioner</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-1">&bull;</span>
                <span>A qualified accountant or auditor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-1">&bull;</span>
                <span>Legal counsel for financial or regulatory matters</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              For any personal financial decisions, tax filings, or investment strategies, we strongly recommend consulting with a qualified professional.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">3. Accuracy and Completeness</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we make every effort to ensure that our calculators use accurate and current data — including SARS tax brackets, prevailing interest rates, and financial regulations, we do not warrant or guarantee the accuracy, completeness, or timeliness of any results. Tax laws, interest rates, and regulations change frequently, and there may be a delay between when changes take effect and when our tools are updated.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">4. Estimation Only</h2>
            <p className="text-muted-foreground leading-relaxed">
              All calculator outputs are <strong className="text-foreground">estimates</strong>. Actual amounts may differ due to factors including but not limited to individual tax circumstances, employer-specific deductions, changes in legislation, rounding differences, and financial institution-specific terms and conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">5. No Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Quick Money Tool, its owner, developers, contributors, and reviewers shall not be held liable for any direct, indirect, incidental, special, or consequential damages arising from the use of, or reliance on, any information or calculator results provided on this Site. This includes, without limitation, financial losses, tax penalties, missed opportunities, or incorrect financial decisions made based on our tools.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">6. External Links and Sources</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Site may contain links to external websites such as{' '}
              <a href="https://www.sars.gov.za" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-rose-500 transition-colors">SARS</a>,{' '}
              the{' '}
              <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-rose-500 transition-colors">South African Reserve Bank</a>,{' '}
              and the{' '}
              <a href="https://www.ncr.org.za" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-rose-500 transition-colors">National Credit Regulator</a>.
              {' '}These links are provided for reference only. We are not responsible for the content, accuracy, or availability of external sites.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">7. No Affiliation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Quick Money Tool is an independent platform and is not affiliated with, endorsed by, or associated with SARS, the South African Reserve Bank, the National Credit Regulator, or any bank, lender, financial institution, or government body.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">8. User Responsibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using this Site, you acknowledge that you are solely responsible for any decisions you make based on the information provided. You agree to verify all calculator results independently before acting on them, particularly for tax submissions, loan applications, or investment decisions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">9. Changes to This Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to update this Disclaimer at any time. Changes will be effective immediately upon posting with an updated &quot;Last updated&quot; date. Your continued use of the Site constitutes acceptance of the revised Disclaimer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">10. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Disclaimer, please contact us at{' '}
              <a href="mailto:hello@quickmoneytool.com" className="text-foreground underline hover:text-rose-500 transition-colors">
                hello@quickmoneytool.com
              </a>{' '}
              or visit our{' '}
              <Link href="/contact" className="text-foreground underline hover:text-rose-500 transition-colors">
                Contact page
              </Link>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
