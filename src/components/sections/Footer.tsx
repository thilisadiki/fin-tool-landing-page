import Link from 'next/link';
import { Calculator, Award } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="px-6 py-12 bg-accent/50 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Quick Money Tool</span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Empowering South Africans with accurate, easy-to-use finance calculators for better money management and planning.
                </p>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-muted-foreground">Free, Secure &amp; Accurate</span>
                </div>
              </div>

              <div>
                <h3 className="text-foreground font-semibold mb-4">Tools</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                  <li><Link href="/calculators/sars-income-tax-calculator" className="hover:text-foreground transition-colors">SARS Tax Calculator</Link></li>
                  <li><Link href="/calculators/vehicle-finance-calculator" className="hover:text-foreground transition-colors">Vehicle Finance Calculator</Link></li>
                  <li><Link href="/calculators/retirement-savings-calculator" className="hover:text-foreground transition-colors">Retirement Savings Calculator</Link></li>
                  <li><Link href="/calculators/personal-loan-calculator" className="hover:text-foreground transition-colors">Personal Loan Calculator</Link></li>
                  <li><Link href="/calculators/budget-calculator" className="hover:text-foreground transition-colors">Budget Calculator</Link></li>
                  <li><Link href="/calculators/currency-converter" className="hover:text-foreground transition-colors">Currency Converter</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-foreground font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link href="/about" className="hover:text-foreground transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-foreground transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/disclaimer" className="hover:text-foreground transition-colors">
                      Disclaimer
                    </Link>
                  </li>
                </ul>

                <h3 className="text-foreground font-semibold mb-4 mt-8">Sources</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="https://www.sars.gov.za" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                      SARS (sars.gov.za)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.resbank.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                      Reserve Bank (resbank.co.za)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncr.org.za" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                      NCR (ncr.org.za)
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-8 text-center">
              <p className="text-muted-foreground">
                &copy; {new Date().getFullYear()} Quick Money Tool. All Rights Reserved. For estimation purposes only. | Website by <a href="https://thilisadiki.dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Jason Sadiki</a>
              </p>
            </div>
          </div>
        </footer>
    );
};

export default Footer;

