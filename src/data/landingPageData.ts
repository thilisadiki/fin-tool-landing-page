import { Calculator, TrendingUp, TrendingDown, PiggyBank, Car, FileText, Shield, Users, Landmark, Wallet, Repeat, Home, type LucideIcon } from 'lucide-react';

export type CalculatorGoal = 'borrowing' | 'saving' | 'tax' | 'daily';

export interface Tool {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  features: string[];
  keywords: string[];
  url: string;
  isInternal?: boolean;
  goals: CalculatorGoal[];
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export const tools: Tool[] = [
  {
    icon: FileText,
    title: "SARS Income Tax Calculator",
    description: "Estimate your annual income tax with our free SARS tax calculator. Perfect for provisional tax and tax return planning in South Africa.",
    color: "from-[#0F2744] to-[#1E3A5F]",
    features: ["Updated 2026/2027 tax brackets", "Medical aid credits", "Retirement fund deductions"],
    keywords: ["sars tax calculator", "income tax south africa", "provisional tax"],
    url: "/calculators/sars-income-tax-calculator",
    isInternal: true,
    goals: ["tax"]
  },
  {
    icon: Car,
    title: "Vehicle Finance Calculator",
    description: "Calculate monthly car payments, total interest, and affordability. Our vehicle finance calculator helps you budget for your new car in SA.",
    color: "from-[#C9A84C] to-[#B8943E]",
    features: ["Monthly payment estimates", "Balloon payment options", "Total cost of credit"],
    keywords: ["vehicle finance calculator", "car payment calculator", "car loan south africa"],
    url: "/calculators/vehicle-finance-calculator",
    isInternal: true,
    goals: ["borrowing"]
  },
  {
    icon: PiggyBank,
    title: "Retirement Savings Calculator",
    description: "Plan your retirement with our savings calculator. Project your retirement annuity (RA) growth and see if you're on track for your goals.",
    color: "from-[#1E3A5F] to-[#0F2744]",
    features: ["Compound growth projection", "Inflation adjustment", "Retirement goal tracking"],
    keywords: ["retirement calculator south africa", "retirement annuity", "savings goal"],
    url: "/calculators/retirement-savings-calculator",
    isInternal: true,
    goals: ["saving"]
  },
  {
    icon: Landmark,
    title: "Personal Loan Calculator",
    description: "See what your monthly repayments could be for a personal loan. Great for planning large purchases or consolidating debt.",
    color: "from-[#B8943E] to-[#9A7A32]",
    features: ["Interest rate impact", "Loan term analysis", "Total repayment amount"],
    keywords: ["personal loan calculator", "loan repayment", "debt consolidation"],
    url: "/calculators/personal-loan-calculator",
    isInternal: true,
    goals: ["borrowing"]
  },
  {
    icon: Home,
    title: "Home Loan Calculator",
    description: "Estimate your monthly bond repayment, transfer duty, and upfront cash needed before you buy property in South Africa.",
    color: "from-[#0F2744] to-[#C9A84C]",
    features: ["Monthly bond repayment", "SARS transfer duty estimate", "Total monthly housing cost"],
    keywords: ["home loan calculator", "bond calculator south africa", "mortgage calculator"],
    url: "/calculators/home-loan-calculator",
    isInternal: true,
    goals: ["borrowing"]
  },
  {
    icon: TrendingDown,
    title: "Debt Payoff Planner",
    description: "Compare snowball vs avalanche strategies. See your debt-free date, total interest saved, and the order to clear your debts in.",
    color: "from-[#0F2744] to-[#C9A84C]",
    features: ["Snowball vs avalanche comparison", "Payoff date and total interest", "Per-debt clearing order"],
    keywords: ["debt payoff calculator", "debt snowball calculator", "debt avalanche south africa"],
    url: "/calculators/debt-payoff-planner",
    isInternal: true,
    goals: ["borrowing", "daily"]
  },
  {
    icon: Wallet,
    title: "Budget Calculator",
    description: "Track your income and expenses with our simple budget planner. Take control of your spending and find opportunities to save.",
    color: "from-[#0F2744] to-[#C9A84C]",
    features: ["Categorize expenses", "Visualize spending habits", "Set savings goals"],
    keywords: ["budget calculator", "monthly budget planner", "expense tracker"],
    url: "/calculators/budget-calculator",
    isInternal: true,
    goals: ["daily", "saving"]
  },
  {
    icon: Repeat,
    title: "Currency Conversion",
    description: "Get up-to-date exchange rates. Convert between the South African Rand (ZAR) and major international currencies instantly.",
    color: "from-[#1E3A5F] to-[#C9A84C]",
    features: ["Real-time rates", "Multiple currencies", "Historical data charts"],
    keywords: ["currency converter", "exchange rates", "foreign exchange"],
    url: "/calculators/currency-converter",
    isInternal: true,
    goals: ["daily"]
  }
];

export interface GoalGroup {
  id: CalculatorGoal | 'all';
  label: string;
  description: string;
}

export const calculatorGoals: GoalGroup[] = [
  {
    id: 'all',
    label: 'All calculators',
    description: 'Every free tool we offer: tax, borrowing, saving, and daily money decisions.',
  },
  {
    id: 'borrowing',
    label: 'Borrowing',
    description: 'Work out monthly instalments and total cost before signing for a car or loan.',
  },
  {
    id: 'saving',
    label: 'Saving',
    description: 'Project long-term growth on retirement annuities and savings goals.',
  },
  {
    id: 'tax',
    label: 'Tax',
    description: 'Estimate PAYE and provisional tax using the latest SARS brackets.',
  },
  {
    id: 'daily',
    label: 'Daily money',
    description: 'Everyday tools for monthly budgeting and currency conversion.',
  },
];

export const features: Feature[] = [
  {
    icon: Calculator,
    title: "Accurate Calculations",
    description: "Our tools use the latest 2026/2027 financial data and tax rates for South Africa."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is processed in your browser and is never stored on our servers."
  },
  {
    icon: TrendingUp,
    title: "Research-Based Guides",
    description: "Practical money guides grounded in real South African situations, from tax season to monthly budgeting."
  },
  {
    icon: Users,
    title: "Professionally Reviewed",
    description: "Every calculator and guide is reviewed by a qualified tax professional working at SARS."
  }
];

export const faqs: Faq[] = [
  {
    question: "Are these financial calculators free to use?",
    answer: "Yes, absolutely! All financial tools and guides on Quick Money Tool are 100% free to use. Our goal is to provide accessible financial planning resources for all South Africans."
  },
  {
    question: "Who reviews your calculators and guides?",
    answer: "Every calculator and guide is reviewed by Ndulamiso Mamburu, a qualified Tax Professional working at the South African Revenue Service (SARS). He checks our tools against current SARS tax tables and regulatory guidance to ensure accuracy."
  },
  {
    question: "How accurate is the SARS Income Tax Calculator?",
    answer: "Our SARS tax calculator uses the official 2026/2027 tax brackets and rates provided by SARS. It provides a very accurate estimate for most individuals, perfect for provisional tax planning. However, for complex financial situations, we always recommend consulting with a certified financial advisor."
  },
  {
    question: "Is my personal information safe?",
    answer: "Your privacy is our top priority. All calculations are performed directly in your browser. We do not see, save, or store any of the personal financial data you enter."
  },
  {
    question: "Is Quick Money Tool just a calculator site?",
    answer: "No. Quick Money Tool is a personal finance guide for South Africans. Alongside our free calculators, we publish research-based articles, practical money guides, and financial explainers tailored to real situations in South Africa, from filing your tax return to budgeting on a local salary."
  },
  {
    question: "Can I use the Vehicle Finance Calculator for used cars?",
    answer: "Yes, our vehicle finance calculator works for both new and used cars. You can adjust the loan term, interest rate, and a balloon payment to match the terms offered by different financial institutions in South Africa."
  }
];
