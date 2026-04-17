import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Linkedin, Briefcase, GraduationCap, Target, User } from 'lucide-react';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { authors, getAuthor, buildPersonSchema } from '@/data/authors';
import { buildBreadcrumbSchema } from '@/data/calculatorSchemaData';

interface AuthorPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return Object.keys(authors).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = getAuthor(params.slug);
  if (!author) return {};
  const title = `${author.name}, ${author.jobTitle}`;
  return {
    title,
    description: author.shortBio,
    alternates: { canonical: `/authors/${author.slug}` },
    openGraph: {
      title: `${author.name} | Quick Money Tool`,
      description: author.shortBio,
      url: `/authors/${author.slug}`,
      type: 'profile',
    },
  };
}

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthor(params.slug);
  if (!author) notFound();

  const personSchema = buildPersonSchema(author);
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: author.name, url: `/authors/${author.slug}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-br dark:from-[#070f1a] dark:via-[#0F2744] dark:to-[#070f1a] from-slate-50 via-[#eef2f7] to-[#e6ecf4]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
          <div
            aria-hidden="true"
            className="w-28 h-28 rounded-full bg-gradient-to-br from-[#0F2744] to-[#C9A84C] flex items-center justify-center text-white text-3xl font-bold shadow-lg shrink-0"
          >
            {initialsFor(author.name)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm uppercase tracking-wider text-[#C9A84C] dark:text-[#D4B96A] font-semibold mb-2">
              Author &amp; Technical Reviewer
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              {author.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {author.jobTitle} at{' '}
              {author.affiliation.url ? (
                <a
                  href={author.affiliation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  {author.affiliation.name}
                </a>
              ) : (
                author.affiliation.name
              )}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-5">
              {author.credentials.map((credential) => (
                <span
                  key={credential}
                  className="text-xs px-3 py-1 rounded-full bg-white/70 dark:bg-slate-800/70 border border-border text-foreground"
                >
                  {credential}
                </span>
              ))}
            </div>
            <a
              href={author.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] hover:bg-[#084d93] text-white text-sm font-medium transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Biography */}
      <Section maxWidth="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#C9A84C] to-[#B8943E] rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Biography</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">{author.bio}</p>
      </Section>

      {/* Credentials & Role */}
      <Section maxWidth="max-w-4xl" className="bg-accent/30">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Role</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-2">
              <strong className="text-foreground">{author.jobTitle}</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {author.affiliation.name}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#B8943E] to-[#9A7A32] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Qualifications</h2>
            </div>
            <ul className="space-y-2">
              {author.credentials.map((credential) => (
                <li
                  key={credential}
                  className="text-muted-foreground leading-relaxed flex items-start gap-2"
                >
                  <span className="text-[#C9A84C] mt-1.5 shrink-0">•</span>
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Expertise */}
      <Section maxWidth="max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-[#1E3A5F] to-[#C9A84C] rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Areas of expertise</h2>
        </div>
        <ul className="grid sm:grid-cols-2 gap-2">
          {author.knowsAbout.map((topic) => (
            <li
              key={topic}
              className="px-4 py-3 rounded-lg bg-white dark:bg-slate-800/50 border border-border text-sm text-foreground"
            >
              {topic}
            </li>
          ))}
        </ul>
      </Section>

      {/* Calculators reviewed */}
      <Section maxWidth="max-w-4xl" className="bg-accent/30">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Calculators reviewed by {author.name.split(' ')[0]}
        </h2>
        <p className="text-muted-foreground mb-6">
          Every tool listed below has been checked against current SARS tables and South African regulatory guidance.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3">
          {author.reviews.map((review) => (
            <li key={review}>
              <Link
                href="/calculators"
                className="block px-4 py-3 rounded-lg bg-white dark:bg-slate-800/50 border border-border text-sm text-foreground hover:border-[#C9A84C] transition-colors"
              >
                {review}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Disclosure */}
      <Section maxWidth="max-w-3xl">
        <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-slate-100 border border-border text-center">
          <h3 className="text-lg font-semibold text-foreground mb-3">Editorial disclosure</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {author.name} reviews the technical accuracy of Quick Money Tool&apos;s calculators and tax content on a voluntary basis. Content is for informational purposes only and is not a substitute for personalised advice from a registered financial advisor or tax practitioner.
          </p>
        </div>
      </Section>
    </>
  );
}
