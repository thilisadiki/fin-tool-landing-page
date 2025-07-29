import React from 'react';
import { Calculator, Award } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
    const handleToolClick = (toolName) => {
        toast({
          title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
          description: `${toolName} will be available soon!`,
        });
    };

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
                  Empowering South Africans with accurate, easy-to-use financial calculators for better money management and planning.
                </p>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-muted-foreground">Free, Secure & Accurate</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-foreground font-semibold mb-4">Tools</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="https://quickmoneytool.com/blog" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Blog</a></li>
                  <li><a href="https://taxcalc.quickmoneytool.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">SARS Tax Calculator</a></li>
                  <li><a href="https://drive.quickmoneytool.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Vehicle Finance Calculator</a></li>
                  <li><a href="https://retire.quickmoneytool.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Retirement Savings Calculator</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-foreground font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="/about.html" className="hover:text-foreground transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/contact.html" className="hover:text-foreground transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="/privacy-policy.html" className="hover:text-foreground transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms-of-service.html" className="hover:text-foreground transition-colors">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border pt-8 text-center">
              <p className="text-muted-foreground">
                © {new Date().getFullYear()} Quick Money Tool. All Rights Reserved. For estimation purposes only.
              </p>
            </div>
          </div>
        </footer>
    );
};

export default Footer;