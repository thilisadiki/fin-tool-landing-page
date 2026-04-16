import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Toaster />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
