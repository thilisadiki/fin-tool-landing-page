export interface CalculatorFaq {
  question: string;
  answer: string;
}

export const sarsTaxFaqs: CalculatorFaq[] = [
  {
    question: 'How is PAYE calculated in South Africa?',
    answer:
      'PAYE is worked out by taking your annual taxable income, applying the progressive SARS tax tables to get your annual tax liability, subtracting the primary rebate (plus the secondary rebate if you are 65 to 74 and tertiary rebate if 75+), and then dividing by 12 to get your monthly deduction. Employers must deduct PAYE every month and pay it over to SARS by the 7th of the following month. See the official brackets at sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/.',
  },
  {
    question: 'When is the 2026/2027 tax return due in South Africa?',
    answer:
      'SARS typically opens tax season for individual filers in July each year. For the 2026/2027 tax year, non-provisional taxpayers usually have until late October 2027 to file via eFiling, while provisional taxpayers have until late January 2028. Always check the official SARS website (www.sars.gov.za) closer to the date for the exact cut-off, as the dates are confirmed each June.',
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
      'Contributions to a pension fund, provident fund, or retirement annuity are deductible up to 27.5% of the greater of your taxable income or remuneration, with an annual cap of R350,000 (see sars.gov.za/types-of-tax/personal-income-tax/tax-and-retirement-fund/). This means putting money into an RA not only grows your retirement savings but also directly reduces the income SARS taxes you on.',
  },
  {
    question: 'What tax rebates do South African pensioners get?',
    answer:
      'Every taxpayer gets the primary rebate. Pensioners aged 65 to 74 get an additional secondary rebate, and those 75 and older get a further tertiary rebate on top of that. These rebates lift your tax-free threshold significantly: for over-75s, you only start paying tax after a much higher annual income than a taxpayer under 65.',
  },
  {
    question: 'Does this SARS tax calculator handle bonuses and 13th cheques?',
    answer:
      'Add your bonus or 13th cheque into the "Other Income" field. The calculator will include it in your annual taxable income, which pushes more of your earnings into higher brackets. That is why your PAYE on a bonus month is higher than on a normal salary month, even though the tax rate tables have not changed.',
  },
  {
    question: 'Is rental income taxable in South Africa?',
    answer:
      'Yes. Rental income from property (including Airbnb) must be declared to SARS. You can deduct expenses directly related to earning that income, such as bond interest, rates, levies, insurance, repairs, and agent fees. The net profit is added to your other income and taxed at your marginal rate. If you earn rental income, you are a provisional taxpayer and must make estimated payments twice a year.',
  },
  {
    question: 'Do I pay tax on cryptocurrency in South Africa?',
    answer:
      'Yes. SARS treats crypto as an intangible asset. If you trade frequently, profits are taxed as income at your marginal rate. If you hold crypto as a long-term investment and sell occasionally, it may be treated as a capital gain, where only 40% of the gain is included in your taxable income (for individuals). The classification depends on your intention, trading frequency, and how long you held the asset.',
  },
  {
    question: 'What is the foreign income exemption under section 10(1)(o)(ii)?',
    answer:
      'If you are a South African tax resident working abroad, the first R1.25 million of your foreign employment income may be exempt from SA tax. You must spend more than 183 days outside South Africa in any 12-month period, with at least 60 of those days being consecutive. This exemption only applies to employment income (salary, bonuses), not freelance work, business income, or passive income like dividends.',
  },
  {
    question: 'When do I not need to submit a tax return?',
    answer:
      'You may not need to file if your total employment income is below R500,000, you have only one employer, you earn no other income (rental, freelance, or business), you have no additional deductions to claim, and you have no capital gains. SARS may auto-assess you using IRP5 and third-party data. If the auto-assessment is correct, you can simply accept it on eFiling.',
  },
  {
    question: 'How does medical tax credit work?',
    answer:
      'If you contribute to a registered medical aid, you receive a monthly tax credit that reduces your tax liability directly (not your taxable income). The credit is a fixed amount per month for yourself, your first dependent, and each additional dependent. These credits are the same regardless of your income level, which means they benefit lower earners proportionally more than higher earners.',
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
      'South African vehicle finance rates are typically quoted as "prime plus X%". The current prime rate is set by the South African Reserve Bank (see resbank.co.za). The exact spread depends on your credit score, deposit size, and the age of the car. New cars with good credit often get close to prime, while used cars or weaker credit profiles can pay prime + 3% or more. Always negotiate, because dealers are paid commission on the rate they sell you.',
  },
  {
    question: 'Should I finance or lease my next car?',
    answer:
      'Finance means you own the car at the end. Leasing (or instalment sale with a guaranteed buy-back) gives you lower monthly payments but no ownership, and you may face mileage or damage penalties. If you keep cars for 5+ years, financing is usually cheaper overall. If you swap cars every 2–3 years, a lease or "residual" product may work out lower cost.',
  },
  {
    question: 'Does the calculator include VAT and on-the-road fees?',
    answer:
      'The calculator works on the final financed amount you enter, so add anything the bank is actually going to finance: the purchase price (usually VAT-inclusive for SA dealer sales), delivery fees, on-the-road charges, and any extras like service plans if you are rolling them into the deal. Trade-in value and cash deposits should be deducted to get the financed amount.',
  },
  {
    question: 'How accurate is this vehicle finance calculator?',
    answer:
      'The calculator provides an estimate based on the values you enter. Actual repayments may vary depending on your lender, your credit profile, and additional fees such as the NCR-capped initiation fee and monthly service fee. Use it as an independent second opinion when comparing dealer and bank quotes.',
  },
  {
    question: 'Can I pay off my car loan early?',
    answer:
      'Yes, most South African lenders allow early settlement. Under the National Credit Act you are entitled to a settlement quotation, but lenders may charge a limited early-settlement penalty on agreements above R250,000 (typically up to three months\' interest). Check your credit agreement for the exact terms before paying extra or settling in full.',
  },
  {
    question: 'How long should I finance a car for?',
    answer:
      'Shorter terms (36–60 months) are generally better because they reduce the total interest paid and limit the risk of being "underwater", which means owing more than the car is worth. A 72-month term lowers the monthly instalment but costs significantly more in total interest, and most cars depreciate faster than you pay them off at that length.',
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
      'Pension and provident funds are employer-sponsored, so your employer chooses the fund and usually matches part of your contribution. A retirement annuity (RA) is a personal product you open yourself, which is useful if you are self-employed or want to save more than your employer fund allows. All three enjoy the same tax deduction up to 27.5% of remuneration, capped at R350,000 per year (see sars.gov.za/types-of-tax/personal-income-tax/tax-and-retirement-fund/).',
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
      'At retirement, you can take up to one-third of most retirement funds as a lump sum (provident funds contributed before 1 March 2021 may allow more). The lump sum is taxed on the retirement tax table, where the first R550,000 is tax-free (see sars.gov.za/types-of-tax/personal-income-tax/tax-and-retirement-fund/). The remaining two-thirds must be used to buy an annuity (a living annuity or a guaranteed life annuity), and the monthly income from that annuity is taxed as normal income.',
  },
  {
    question: 'How accurate is this retirement calculator?',
    answer:
      'The calculator gives a realistic projection based on the numbers you enter: current age, retirement age, monthly contribution, expected return, and inflation assumption. Real outcomes will differ because investment returns are not linear, inflation varies year to year, and your contributions may change. Use it as a planning tool and revisit the numbers every year or whenever your salary, fund, or goals change.',
  },
  {
    question: 'When should I start saving for retirement?',
    answer:
      'As early as possible. Compound growth is the single biggest lever in retirement planning: R1,000 a month from age 25 often beats R2,500 a month from age 40 by retirement. If you are in your first job, start with whatever you can afford, even R500 a month into a retirement annuity, and increase it every time you get a raise.',
  },
  {
    question: 'What happens if I start saving late?',
    answer:
      'You can still build a meaningful retirement pot, but you will need to contribute more aggressively, delay retirement if possible, and lean harder on tax-deductible vehicles like a retirement annuity (up to 27.5% of remuneration, capped at R350,000 per year). Prioritise clearing high-interest debt first so every spare rand can go to retirement instead of interest.',
  },
  {
    question: 'Can I rely on government support in retirement?',
    answer:
      'The South African state old-age grant provides a modest monthly payment to qualifying citizens over 60, subject to a means test. It is designed as a safety net, not a retirement plan, and is well below what most people need to maintain their pre-retirement lifestyle. Treat any grant as a supplement to your own retirement savings, not a replacement for them.',
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
      'The National Credit Act (ncr.org.za) caps unsecured personal loan interest rates. The current cap is the repo rate × 2.2 + 20% per annum (plus once-off initiation fees capped at R1,207.50 and monthly service fees capped at R69, as per the NCR maximum rates & fees schedule). Always ask for the total cost of credit, not just the headline rate, so you can compare apples to apples.',
  },
  {
    question: 'Does paying off a personal loan early save money?',
    answer:
      'Yes, but check the fine print. Under the NCA (enforced by the National Credit Regulator at ncr.org.za), lenders cannot charge early-settlement penalties on small agreements, but may charge a settlement fee equal to up to three months of interest on larger agreements if you settle more than three months before term end. Even with the fee, paying off a 15%+ loan early almost always beats keeping the money in a savings account.',
  },
  {
    question: 'What is APR and why is it different from the interest rate?',
    answer:
      'The interest rate is what the lender charges on the outstanding balance. APR (annual percentage rate) bundles in initiation fees, monthly service fees, and credit life insurance so you see the true annual cost. Two loans with the same interest rate can have very different APRs depending on fees. South African lenders must quote both, so always compare the APR.',
  },
  {
    question: 'How much personal loan can I qualify for?',
    answer:
      'South African lenders use affordability assessments under the NCA: they look at your net income, subtract necessary living expenses and existing debt commitments, and apply a debt-to-income ratio (usually the monthly instalment cannot exceed 30–40% of your disposable income). A good credit score, stable employment, and low existing debt pushes the amount you can qualify for higher.',
  },
  {
    question: 'How accurate is this personal loan calculator?',
    answer:
      'The calculator provides a reliable estimate based on the values you enter: loan amount, interest rate, term, and monthly service fee. Actual loan terms may vary depending on your lender and credit profile, and real quotes will include an initiation fee (up to R1,207.50) and sometimes bundled credit life insurance. Use the calculator as an independent second opinion when comparing loan offers.',
  },
  {
    question: 'What is a good interest rate for a personal loan in South Africa?',
    answer:
      'A "good" rate depends on your credit score and income. Prime borrowers with clean credit records can get rates close to prime + 3% to 5%. Mid-risk profiles typically see prime + 7% to 12%. Anything close to the NCA cap (repo × 2.2 + 20%) is a signal that you are being priced as high-risk and should shop around or try to improve your credit score first.',
  },
  {
    question: 'How long should I take a personal loan for?',
    answer:
      'Shorter terms are generally better because they reduce total interest paid, but the monthly instalment must stay affordable. A 24–36 month term is ideal where possible. Stretching a loan to 60 or 72 months lowers the monthly payment but can double the total interest. Only go long if the shorter term would push your debt-to-income ratio above 40%.',
  },
  {
    question: 'Does applying for a loan affect my credit score?',
    answer:
      'Yes. Every formal loan application creates a hard enquiry on your credit report, and multiple enquiries in a short period can lower your score. Before applying, use affordability tools and compare offers using published rates rather than submitting applications to many lenders at once. Pre-qualification checks (soft enquiries) do not affect your score and are a safer way to compare.',
  },
];

export const homeLoanFaqs: CalculatorFaq[] = [
  {
    question: 'How is a bond repayment calculated in South Africa?',
    answer:
      'A home loan repayment is calculated using the standard amortisation formula. Your instalment depends on the amount borrowed, the interest rate, and the bond term in months. Each payment covers that month\'s interest first, with the rest paying down capital. Early in the bond, a larger share goes to interest; later, more goes to principal.',
  },
  {
    question: 'How much deposit do I need for a home loan?',
    answer:
      'Some buyers qualify for a 100% bond, but a deposit of 10% to 20% usually puts you in a stronger position. It reduces the amount borrowed, lowers your loan-to-value ratio, and can help you negotiate a better interest rate. It also leaves you with less interest to pay over the life of the bond.',
  },
  {
    question: 'Does this calculator include transfer duty?',
    answer:
      'Yes. The calculator estimates transfer duty using the current SARS rates that apply from 1 April 2026. For example, transfer duty is 0% up to R1,210,000, then rises on a sliding scale above that. Remember that not every purchase pays transfer duty: some new developments are sold VAT-inclusive instead, in which case transfer duty may not apply.',
  },
  {
    question: 'What property costs are not included here?',
    answer:
      'This calculator includes the bond repayment, municipal rates, levies, and an estimate of transfer duty. It does not include conveyancing fees, bond registration attorney fees, deeds office charges, homeowners insurance, life cover, moving costs, maintenance, or utilities. In real life, those costs matter, so treat this as a strong planning estimate, not the full closing statement.',
  },
  {
    question: 'Should I choose a 20-year or 30-year bond?',
    answer:
      'A 30-year term lowers your monthly instalment, which helps affordability, but you pay much more interest over time. A 20-year term costs more each month but saves a significant amount in total interest and gets you debt-free sooner. If the 20-year payment still leaves breathing room in your budget, it is usually the better long-term choice.',
  },
  {
    question: 'What interest rate should I use for a South African bond?',
    answer:
      'Use the actual rate quoted by your lender if you have it. If you are still estimating, many South African bonds are priced relative to prime. The South African Reserve Bank\'s March 2026 MPC statement kept the policy rate at 6.75%, and the SARB\'s April 2026 consultation paper notes that prime has been a fixed 350 basis points above the policy rate since 2001. That implies a reference prime around 10.25%, but your quoted bond rate can be above or below that depending on your profile and the bank.',
  },
  {
    question: 'How much of my income should go toward my bond?',
    answer:
      'A common rule of thumb is to keep your bond repayment below about 25% to 30% of your gross monthly income, and your total housing cost below roughly one-third. Banks also run affordability checks under the National Credit Act, looking at your income, expenses, and existing debts. Just because a bank approves a number does not mean it will feel comfortable in your day-to-day budget.',
  },
  {
    question: 'Can I lower my home loan interest over time?',
    answer:
      'Yes. A stronger credit profile, a bigger deposit, and shopping multiple banks through a broker can all help you get a better starting rate. After the bond is in place, paying extra into the loan or refinancing when your profile improves can reduce the interest you pay. Even a small extra payment each month shortens the term faster than most buyers expect.',
  },
];

export const budgetFaqs: CalculatorFaq[] = [
  {
    question: 'How accurate is this budget calculator?',
    answer:
      'The calculator provides a reliable estimate based on the data you enter. However, actual results depend on your spending habits and financial discipline. The more honest and detailed you are with your numbers, the more useful the output will be.',
  },
  {
    question: 'What is the 50/30/20 rule?',
    answer:
      'The 50/30/20 rule suggests allocating 50% of your after-tax income to needs (rent, groceries, transport, utilities, medical aid, minimum debt payments), 30% to wants (eating out, entertainment, hobbies, subscriptions), and 20% to savings and extra debt repayment. It is a starting framework, not a strict law. Young professionals with expensive rent in Cape Town or Johannesburg may need to shift the percentages.',
  },
  {
    question: 'Should I include savings as an expense in my budget?',
    answer:
      'Yes. Savings should be treated as a fixed monthly commitment, not something you do only when money is left over. By treating it as a non-negotiable expense, you build the habit of paying yourself first and ensure your long-term financial goals stay on track.',
  },
  {
    question: 'How often should I update my budget?',
    answer:
      'You should review your budget at least once a month or whenever your income or expenses change significantly. Life events like salary increases, new debt, moving house, or having a child all require budget adjustments. The more regularly you review, the more effective your budget becomes.',
  },
  {
    question: 'How do I budget if my income is irregular?',
    answer:
      'If you are a freelancer, commission earner, or business owner, budget against your lowest expected monthly income, not your average. Route all income into a holding account, pay yourself a fixed "salary" each month, and keep the surplus as a buffer. Build a 3 to 6 month emergency fund before you start investing, because irregular income needs more runway than a salaried role.',
  },
  {
    question: 'Can budgeting help me get out of debt?',
    answer:
      'Yes. Budgeting helps you allocate funds toward debt repayment while preventing further overspending. By identifying unnecessary expenses and redirecting that money toward your highest-interest debt first (credit cards, store cards, personal loans), you can systematically reduce what you owe and avoid paying more interest than necessary.',
  },
  {
    question: 'Should I save or pay off debt first?',
    answer:
      'First build a small emergency buffer (around R10,000 to R20,000) so a flat tyre or a broken geyser does not force you to borrow. Then prioritise paying off any debt with an interest rate above about 10%, such as credit cards, store cards, and personal loans. Only once that high-interest debt is gone does it make sense to redirect the same amount into investments like a tax-free savings account or RA.',
  },
  {
    question: 'What counts as a "need" vs a "want" in a South African budget?',
    answer:
      'Needs are things you would still pay for if your income was halved: rent or bond, groceries (not takeaways), basic transport (including petrol and car instalment if you need the car for work), utilities, medical aid, school fees, and minimum debt repayments. Wants are the negotiables: DStv, gym, streaming subscriptions, restaurant meals, and new clothes beyond replacement. Being honest about the split is the first step.',
  },
  {
    question: 'How do I budget for annual expenses like car licences or school fees?',
    answer:
      'Add up your annual non-monthly expenses (licence disc, TV licence, insurance excess buffer, back-to-school expenses, holiday spending), divide by 12, and move that amount into a dedicated "sinking fund" account every month. When the bill arrives, the money is already there. Leaving these out of your monthly budget is the single most common reason budgets fail in January and at year-end.',
  },
  {
    question: 'How much should I keep in an emergency fund?',
    answer:
      'The standard guidance is three to six months of essential expenses, covering rent, groceries, transport, utilities, minimum debt, and medical costs. Single-income households, freelancers, and those in industries at risk of retrenchment should aim for six months. Keep the fund in an instant-access account earning interest (a money market account works well), separate from your everyday transaction account.',
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
      'The rate on this page is the interbank (mid-market) rate, which is what banks pay each other. When you buy forex from a South African bank or cash it at an airport, they add a margin, usually 2–4% for retail customers. Online forex providers and fintechs (Wise, Shyft, PayPal, etc.) typically take smaller spreads. Always compare the total amount of foreign currency you receive, not the advertised "rate".',
  },
  {
    question: 'What is the best way to get foreign currency in South Africa?',
    answer:
      'For small amounts under R5,000, a travel-ready app like Shyft or FNB Global Account gives decent rates and instant access. For larger amounts, specialist providers (like Sable, CurrencyAssist, or Investec\'s forex desk) beat retail bank rates. Always order ahead instead of at the airport, because airport bureaus have the worst rates in the country.',
  },
  {
    question: 'How much forex can I take out of South Africa per year?',
    answer:
      'South African tax residents have a R1 million single discretionary allowance (SDA) per calendar year for travel, gifts, maintenance, investment, or online purchases, and you do not need SARS approval for this. Above that, up to R10 million per year requires a SARS tax compliance status (TCS) PIN, and anything above R10 million needs Reserve Bank approval (see resbank.co.za).',
  },
  {
    question: 'Why does the Rand weaken when the US dollar strengthens?',
    answer:
      'The Rand is an emerging-market currency, so it tends to move with global risk sentiment. When US interest rates rise or there is a global risk-off event (recession fears, geopolitical shocks), investors move money out of emerging markets into safer USD-denominated assets. That capital flow buys dollars and sells Rand, which pushes the ZAR-USD rate higher. Local factors like Eskom, politics, and the trade balance amplify the move.',
  },
  {
    question: 'Can I use this currency converter for SARS or accounting purposes?',
    answer:
      'The converter is a useful reference but is not an official SARS rate. For tax returns and accounting, SARS publishes monthly and annual average exchange rates for the major currencies (see sars.gov.za/legal-counsel/secondary-legislation/exchange-rates/). Use those official tables when translating foreign income, capital gains, or foreign-denominated assets into Rand for your return.',
  },
];

export const debtPayoffFaqs: CalculatorFaq[] = [
  {
    question: 'What is the difference between the snowball and avalanche methods?',
    answer:
      'Both pay the minimums on every debt every month. The snowball method directs any extra payment at the debt with the smallest balance, no matter the interest rate, so you clear whole accounts quickly and stay motivated. The avalanche method directs the extra at the debt with the highest interest rate, so you pay the least interest in total. The calculator runs both side by side so you can see the difference in payoff date and total interest for your specific debts.',
  },
  {
    question: 'Which is better, snowball or avalanche?',
    answer:
      'Avalanche always wins on pure maths because it kills the highest-rate interest first. Snowball usually wins in practice because the early account closures keep people committed long enough to actually finish. If avalanche only saves you a small amount, pick snowball. If your highest-rate debt is also a meaningful chunk of what you owe, the avalanche saving can be significant and is usually worth the slower start.',
  },
  {
    question: 'Should I pay extra on the smallest debt or the highest-rate debt?',
    answer:
      'Always keep the minimums going on every debt to avoid fees and credit damage. Then pick one target debt for the extra payment. Smallest balance gives you the snowball method (faster wins). Highest interest rate gives you the avalanche method (less total interest). Splitting the extra across multiple debts is the worst option because no single debt clears any faster.',
  },
  {
    question: 'How much extra should I put toward debt each month?',
    answer:
      'As much as you can sustain without skipping rent, groceries, or essential bills. Even an extra R500 to R1,000 per month against a high-rate balance can shave years off the payoff timeline because of how compounding works in reverse. Use the calculator to see what different extra amounts do to your payoff date and total interest.',
  },
  {
    question: 'Does this calculator work for credit cards, personal loans, and store accounts?',
    answer:
      'Yes. Add any debt that charges interest: credit cards, store accounts, personal loans, vehicle finance, overdrafts. The calculator only needs the current balance, the annual interest rate, and the minimum monthly payment for each one. It does not include home loans by default since those usually have very different payoff strategies tied to bond structuring.',
  },
  {
    question: 'What if my minimum payment is less than the monthly interest?',
    answer:
      'Then the debt is going backwards. The calculator detects this and shows a warning instead of an unrealistic payoff date. To fix it, either increase the minimum payment, add an extra monthly amount, or speak to the lender about a restructure. In severe cases, debt review under the National Credit Act is the formal route in South Africa.',
  },
  {
    question: 'Should I consolidate my debts instead of paying them off one by one?',
    answer:
      'Consolidation only helps when the new loan has a meaningfully lower interest rate than the weighted average of your existing debts and you actually keep the discipline of not running up the old accounts again. If the consolidation rate is similar or higher, you are just extending the term and paying more interest overall. Run both scenarios through the calculator before committing.',
  },
  {
    question: 'What is debt review under the NCA and when should I consider it?',
    answer:
      'Debt review (or debt counselling) is a formal process under the National Credit Act where a registered debt counsellor restructures your repayments to an affordable level and protects you from legal action while the plan runs. It is the right route when you genuinely cannot make the minimum payments on your debts. While in debt review you cannot take on new credit, and your credit profile reflects the status until you exit. See ncr.org.za for the official process.',
  },
];
