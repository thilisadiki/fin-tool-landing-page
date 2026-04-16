export interface CalculatorFaq {
  question: string;
  answer: string;
}

export const sarsTaxFaqs: CalculatorFaq[] = [
  {
    question: 'How is PAYE calculated in South Africa?',
    answer:
      'PAYE is worked out by taking your annual taxable income, applying the progressive SARS tax tables to get your annual tax liability, subtracting the primary rebate (plus the secondary rebate if you are 65–74 and tertiary rebate if 75+), and then dividing by 12 to get your monthly deduction. Employers must deduct PAYE every month and pay it over to SARS by the 7th of the following month.',
  },
  {
    question: 'When is the 2026/2027 tax return due in South Africa?',
    answer:
      'SARS typically opens tax season for individual filers in July each year. For the 2026/2027 tax year, non-provisional taxpayers usually have until late October 2027 to file via eFiling, while provisional taxpayers have until late January 2028. Always check the official SARS website closer to the date for the exact cut-off, as the dates are confirmed each June.',
  },
  {
    question: 'What is the difference between income tax and PAYE?',
    answer:
      'PAYE (Pay-As-You-Earn) is the mechanism by which your employer withholds income tax from your salary every month. Income tax is your total annual tax liability, which may also include tax on rental income, freelance work, investment returns, and capital gains. Your year-end return reconciles what PAYE already covered against what you actually owe on all your income sources.',
  },
  {
    question: 'Do I need to pay provisional tax?',
    answer:
      'You are generally a provisional taxpayer if you earn income that is not subject to PAYE, such as rental income, freelance income, business profits, or investment income above R30,000 in interest. Provisional taxpayers make two estimated tax payments during the year (end of August and end of February) and a top-up after filing. Salaried employees with no side income are usually exempt.',
  },
  {
    question: 'How much can I deduct for retirement annuity contributions?',
    answer:
      'Contributions to a pension fund, provident fund, or retirement annuity are deductible up to 27.5% of the greater of your taxable income or remuneration, with an annual cap of R350,000. This means putting money into an RA not only grows your retirement savings but also directly reduces the income SARS taxes you on.',
  },
  {
    question: 'What tax rebates do South African pensioners get?',
    answer:
      'Every taxpayer gets the primary rebate. Pensioners aged 65–74 get an additional secondary rebate, and those 75 and older get a further tertiary rebate on top of that. These rebates lift your tax-free threshold significantly: for over-75s, you only start paying tax after a much higher annual income than a taxpayer under 65.',
  },
  {
    question: 'Does this SARS tax calculator handle bonuses and 13th cheques?',
    answer:
      'Add your bonus or 13th cheque into the "Other Income" field. The calculator will include it in your annual taxable income, which pushes more of your earnings into higher brackets. That is why your PAYE on a bonus month is higher than on a normal salary month, even though the tax rate tables have not changed.',
  },
];

export const vehicleFinanceFaqs: CalculatorFaq[] = [
  {
    question: 'How is a car loan instalment calculated in South Africa?',
    answer:
      'South African banks use the standard amortisation formula: your monthly payment is based on the financed amount (vehicle price minus deposit, plus extras), the interest rate, and the loan term in months. If there is a balloon payment, that portion is deferred to the end and is not amortised monthly, which lowers your instalment but leaves a large lump sum due at the end.',
  },
  {
    question: 'What is a balloon payment on a vehicle finance deal?',
    answer:
      'A balloon payment is a lump sum (usually 20–40% of the vehicle price) deferred to the end of the finance term. It reduces your monthly instalments but means you must refinance, sell, or pay it off in cash when the term ends. Banks charge interest on the balloon portion for the whole term, so the total cost of credit is usually higher than a loan without a balloon.',
  },
  {
    question: 'Is a deposit on a car worth it?',
    answer:
      'A bigger deposit reduces the financed amount, your monthly payment, and the total interest you pay over the loan term. It also lowers your loan-to-value ratio, which can get you a better interest rate from the bank. Aim for at least 10% down if you can, and avoid going over 72 months of finance to limit the risk of being "underwater" (owing more than the car is worth).',
  },
  {
    question: 'What interest rate can I expect on a car loan?',
    answer:
      'South African vehicle finance rates are typically quoted as "prime plus X%". The exact spread depends on your credit score, deposit size, and the age of the car. New cars with good credit often get close to prime, while used cars or weaker credit profiles can pay prime + 3% or more. Always negotiate — dealers are paid commission on the rate they sell you.',
  },
  {
    question: 'Should I finance or lease my next car?',
    answer:
      'Finance means you own the car at the end. Leasing (or instalment sale with a guaranteed buy-back) gives you lower monthly payments but no ownership, and you may face mileage or damage penalties. If you keep cars for 5+ years, financing is usually cheaper overall. If you swap cars every 2–3 years, a lease or "residual" product may work out lower cost.',
  },
  {
    question: 'Does the calculator include VAT and on-the-road fees?',
    answer:
      'The calculator works on the final financed amount you enter, so add anything the bank is actually going to finance — the purchase price (usually VAT-inclusive for SA dealer sales), delivery fees, on-the-road charges, and any extras like service plans if you are rolling them into the deal. Trade-in value and cash deposits should be deducted to get the financed amount.',
  },
];

export const retirementSavingsFaqs: CalculatorFaq[] = [
  {
    question: 'What is the 4% rule for retirement?',
    answer:
      'The 4% rule is a rough guide that says you can withdraw 4% of your retirement savings in your first year of retirement, then increase that amount with inflation each year, and have a high probability of the money lasting 25–30 years. For example, a R5 million retirement pot suggests a first-year income of roughly R200,000. South African research suggests a 3.5–4% starting rate is more realistic given local market volatility.',
  },
  {
    question: 'How much should I save for retirement in South Africa?',
    answer:
      'A common rule of thumb is 15% of your gross income from the moment you start working. If you start later, you may need 20–25%. Your target retirement pot depends on the lifestyle you want: a very rough benchmark is 15–20 times your annual pre-retirement expenses, so if you spend R400,000 a year, you would aim for a R6–R8 million retirement fund.',
  },
  {
    question: 'What is the difference between a pension fund, provident fund, and retirement annuity?',
    answer:
      'Pension and provident funds are employer-sponsored — your employer chooses the fund and usually matches part of your contribution. A retirement annuity (RA) is a personal product you open yourself, which is useful if you are self-employed or want to save more than your employer fund allows. All three enjoy the same tax deduction up to 27.5% of remuneration, capped at R350,000 per year.',
  },
  {
    question: 'Does the retirement calculator account for inflation?',
    answer:
      'Yes. The calculator lets you enter an assumed inflation rate (South African CPI typically runs at 4–6%) so that your projected retirement pot and income are expressed in today\'s money. This is critical: without inflation adjustment, a R5 million nominal pot in 30 years sounds impressive but may only buy what R1.5 million buys today.',
  },
  {
    question: 'Can I withdraw from my retirement annuity before retirement?',
    answer:
      'Generally, no. Retirement annuities in South Africa are locked in until age 55, with very limited exceptions (emigration followed by tax residency cessation, disability, or small account balances below R15,000). This lock-in is why RAs get a tax break: the rules are designed to protect your future self from your present self.',
  },
  {
    question: 'What tax do I pay on my retirement savings when I retire?',
    answer:
      'At retirement, you can take up to one-third of most retirement funds as a lump sum (provident funds contributed before 1 March 2021 may allow more). The lump sum is taxed on the retirement tax table, where the first R550,000 is tax-free. The remaining two-thirds must be used to buy an annuity (a living annuity or a guaranteed life annuity), and the monthly income from that annuity is taxed as normal income.',
  },
];

export const personalLoanFaqs: CalculatorFaq[] = [
  {
    question: 'How is interest calculated on a personal loan in South Africa?',
    answer:
      'Personal loans in South Africa use simple compound interest charged on the reducing balance. Each monthly payment pays off some interest plus some principal. Early in the loan, most of the payment is interest; as the balance drops, more of each payment goes to principal. This is why paying extra early saves you far more interest than the same amount paid late in the term.',
  },
  {
    question: 'Is debt consolidation worth it?',
    answer:
      'Debt consolidation usually makes sense if the new loan\'s interest rate is meaningfully lower than the weighted average rate on your existing debts, and if you commit to not re-racking the old accounts. South African credit cards can run at 20%+, so consolidating into a 15% personal loan and closing the cards can save real money. It fails when people pay off cards, then run them up again.',
  },
  {
    question: 'What is the maximum personal loan interest rate in South Africa?',
    answer:
      'The National Credit Act caps unsecured personal loan interest rates. The current cap is the repo rate × 2.2 + 20% per annum (plus once-off initiation fees and monthly service fees regulated separately). Always ask for the total cost of credit, not just the headline rate, so you can compare apples to apples.',
  },
  {
    question: 'Does paying off a personal loan early save money?',
    answer:
      'Yes, but check the fine print. Under the NCA, lenders cannot charge early-settlement penalties on small agreements, but may charge a settlement fee equal to up to three months of interest on larger agreements if you settle more than three months before term end. Even with the fee, paying off a 15%+ loan early almost always beats keeping the money in a savings account.',
  },
  {
    question: 'What is APR and why is it different from the interest rate?',
    answer:
      'The interest rate is what the lender charges on the outstanding balance. APR (annual percentage rate) bundles in initiation fees, monthly service fees, and credit life insurance so you see the true annual cost. Two loans with the same interest rate can have very different APRs depending on fees. South African lenders must quote both — always compare the APR.',
  },
  {
    question: 'How much personal loan can I qualify for?',
    answer:
      'South African lenders use affordability assessments under the NCA: they look at your net income, subtract necessary living expenses and existing debt commitments, and apply a debt-to-income ratio (usually the monthly instalment cannot exceed 30–40% of your disposable income). A good credit score, stable employment, and low existing debt pushes the amount you can qualify for higher.',
  },
];

export const budgetFaqs: CalculatorFaq[] = [
  {
    question: 'What is the 50/30/20 rule?',
    answer:
      'The 50/30/20 rule suggests allocating 50% of your after-tax income to needs (rent, groceries, transport, utilities, medical aid, minimum debt payments), 30% to wants (eating out, entertainment, hobbies, subscriptions), and 20% to savings and extra debt repayment. It is a starting framework, not a strict law — young professionals with expensive rent in Cape Town or Johannesburg may need to shift the percentages.',
  },
  {
    question: 'How do I budget if my income is irregular?',
    answer:
      'If you are a freelancer, commission earner, or business owner, budget against your lowest expected monthly income, not your average. Route all income into a holding account, pay yourself a fixed "salary" each month, and keep the surplus as a buffer. Build a 3–6 month emergency fund before you start investing, because irregular income needs more runway than a salaried role.',
  },
  {
    question: 'Should I save or pay off debt first?',
    answer:
      'First build a small emergency buffer (around R10,000–R20,000) so a flat tyre or a broken geyser does not force you to borrow. Then prioritise paying off any debt with an interest rate above about 10% — credit cards, store cards, personal loans. Only once that high-interest debt is gone does it make sense to redirect the same amount into investments like a tax-free savings account or RA.',
  },
  {
    question: 'What counts as a "need" vs a "want" in a South African budget?',
    answer:
      'Needs are things you would still pay for if your income was halved: rent or bond, groceries (not take-aways), basic transport (including petrol and car instalment if you need the car for work), utilities, medical aid, school fees, and minimum debt repayments. Wants are the negotiables — DStv, gym, streaming subscriptions, restaurant meals, new clothes beyond replacement. Being honest about the split is the first step.',
  },
  {
    question: 'How do I budget for annual expenses like car licences or school fees?',
    answer:
      'Add up your annual non-monthly expenses (licence disc, TV licence, insurance excess buffer, back-to-school expenses, holiday spending), divide by 12, and move that amount into a dedicated "sinking fund" account every month. When the bill arrives, the money is already there. Leaving these out of your monthly budget is the single most common reason budgets fail in January and at year-end.',
  },
  {
    question: 'How much should I keep in an emergency fund?',
    answer:
      'The standard guidance is three to six months of essential expenses — rent, groceries, transport, utilities, minimum debt, medical. Single-income households, freelancers, and those in industries at risk of retrenchment should aim for six months. Keep the fund in an instant-access account earning interest (a money market account works well), separate from your everyday transaction account.',
  },
];

export const currencyConverterFaqs: CalculatorFaq[] = [
  {
    question: 'How often do the exchange rates on this converter update?',
    answer:
      'Rates are refreshed from live market data, so the ZAR-USD, ZAR-EUR, ZAR-GBP and other major pairs you see reflect the current interbank market within a few minutes. Over weekends and public holidays rates freeze because the global foreign exchange market is closed. For very large transfers, the rate you actually get from a bank or forex provider will also include their spread.',
  },
  {
    question: 'Why is the rate my bank gives me different from the rate shown here?',
    answer:
      'The rate on this page is the interbank (mid-market) rate — what banks pay each other. When you buy forex from a South African bank or cash it at an airport, they add a margin, usually 2–4% for retail customers. Online forex providers and fintechs (Wise, Shyft, PayPal, etc.) typically take smaller spreads. Always compare the total amount of foreign currency you receive, not the advertised "rate".',
  },
  {
    question: 'What is the best way to get foreign currency in South Africa?',
    answer:
      'For small amounts under R5,000, a travel-ready app like Shyft or FNB Global Account gives decent rates and instant access. For larger amounts, specialist providers (like Sable, CurrencyAssist, or Investec\'s forex desk) beat retail bank rates. Always order ahead instead of at the airport — airport bureaus have the worst rates in the country.',
  },
  {
    question: 'How much forex can I take out of South Africa per year?',
    answer:
      'South African tax residents have a R1 million single discretionary allowance (SDA) per calendar year for travel, gifts, maintenance, investment, or online purchases — you do not need SARS approval. Above that, up to R10 million per year requires a SARS tax compliance status (TCS) PIN, and anything above R10 million needs Reserve Bank approval.',
  },
  {
    question: 'Why does the Rand weaken when the US dollar strengthens?',
    answer:
      'The Rand is an emerging-market currency, so it tends to move with global risk sentiment. When US interest rates rise or there is a global risk-off event (recession fears, geopolitical shocks), investors move money out of emerging markets into safer USD-denominated assets. That capital flow buys dollars and sells Rand, which pushes the ZAR-USD rate higher. Local factors — Eskom, politics, the trade balance — amplify the move.',
  },
  {
    question: 'Can I use this currency converter for SARS or accounting purposes?',
    answer:
      'The converter is a useful reference but is not an official SARS rate. For tax returns and accounting, SARS publishes monthly and annual average exchange rates for the major currencies. Use those official tables when translating foreign income, capital gains, or foreign-denominated assets into Rand for your return.',
  },
];
