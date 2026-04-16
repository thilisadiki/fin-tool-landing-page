const BASE_URL = 'https://www.quickmoneytool.com';

export interface Author {
  slug: string;
  name: string;
  jobTitle: string;
  affiliation: {
    name: string;
    url?: string;
  };
  credentials: string[];
  shortCredentials: string;
  shortBio: string;
  bio: string;
  linkedIn: string;
  image?: string;
  knowsAbout: string[];
  reviews: string[];
}

export const ndulamiso: Author = {
  slug: 'ndulamiso-mamburu',
  name: 'Ndulamiso Mamburu',
  jobTitle: 'Tax Professional',
  affiliation: {
    name: 'South African Revenue Service (SARS)',
    url: 'https://www.sars.gov.za',
  },
  credentials: [
    'Bachelor of Accounting Sciences',
    'Postgraduate studies in Taxation (in progress)',
  ],
  shortCredentials: 'BCompt (Acc. Sci.)',
  shortBio:
    'Accounting Sciences graduate working at the South African Revenue Service (SARS) and pursuing a postgraduate qualification in Taxation.',
  bio: 'Ndulamiso is an Accounting Sciences graduate currently working at the South African Revenue Service (SARS), South Africa\u2019s national tax authority. He is pursuing a further postgraduate qualification in Taxation to deepen his specialisation in South African tax law, PAYE, provisional tax, and compliance under the Tax Administration Act and National Credit Act. As the technical reviewer for Quick Money Tool, Ndulamiso checks every SARS-related calculator, retirement tax assumption, and personal finance explainer against current SARS tables and regulatory guidance.',
  linkedIn: 'https://www.linkedin.com/in/ndulamiso-mamburu/',
  knowsAbout: [
    'South African income tax',
    'SARS PAYE calculations',
    'Tax rebates and thresholds',
    'Medical tax credits',
    'Retirement annuity tax deductions',
    'Provisional tax',
    'Tax Administration Act compliance',
    'National Credit Act compliance',
    'Personal finance in South Africa',
    'Household budgeting',
  ],
  reviews: [
    'SARS Income Tax Calculator',
    'Vehicle Finance Calculator',
    'Retirement Savings Calculator',
    'Personal Loan Calculator',
    'Budget Calculator',
    'Currency Converter',
  ],
};

export const authors: Record<string, Author> = {
  [ndulamiso.slug]: ndulamiso,
};

export function getAuthor(slug: string): Author | undefined {
  return authors[slug];
}

export function getAuthorUrl(author: Author): string {
  return `${BASE_URL}/authors/${author.slug}`;
}

export function getAuthorId(author: Author): string {
  return `${getAuthorUrl(author)}#person`;
}

export function buildPersonSchema(author: Author) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': getAuthorId(author),
    name: author.name,
    url: getAuthorUrl(author),
    jobTitle: author.jobTitle,
    description: author.shortBio,
    worksFor: {
      '@type': 'Organization',
      name: author.affiliation.name,
      ...(author.affiliation.url ? { url: author.affiliation.url } : {}),
    },
    hasCredential: author.credentials.map((credential) => ({
      '@type': 'EducationalOccupationalCredential',
      name: credential,
    })),
    knowsAbout: author.knowsAbout,
    ...(author.image
      ? {
          image: {
            '@type': 'ImageObject',
            url: author.image.startsWith('http') ? author.image : `${BASE_URL}${author.image}`,
          },
        }
      : {}),
    sameAs: [author.linkedIn],
  };
}
