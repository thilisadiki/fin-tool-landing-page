import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  maxWidth?: 'max-w-4xl' | 'max-w-7xl';
  children: React.ReactNode;
}

export default function Section({
  id,
  className,
  containerClassName,
  maxWidth = 'max-w-7xl',
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn('px-6 py-20', className)}>
      <div className={cn(maxWidth, 'mx-auto', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
