const BASE_URL = 'https://api.frankfurter.dev/v1';

export interface CurrencyRatesResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface HistoricalRate {
  date: string;
  rate: number;
}

export const FALLBACK_CURRENCIES: Record<string, string> = {
  'ZAR': 'South African Rand',
  'USD': 'United States Dollar',
  'EUR': 'Euro',
  'GBP': 'British Pound Sterling',
  'JPY': 'Japanese Yen',
  'CAD': 'Canadian Dollar',
  'AUD': 'Australian Dollar',
  'CHF': 'Swiss Franc',
  'CNY': 'Chinese Yuan',
  'INR': 'Indian Rupee'
};

export async function fetchSupportedCurrencies(): Promise<Record<string, string>> {
  try {
    // Next.js configures fetch internally, 24 hour cache
    const response = await fetch(`${BASE_URL}/currencies`, { next: { revalidate: 86400 } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching supported currencies:', error);
    return FALLBACK_CURRENCIES;
  }
}

export async function fetchExchangeRates(baseCurrency: string): Promise<CurrencyRatesResponse | null> {
  try {
    // 1 hour cache for latest rates
    const response = await fetch(`${BASE_URL}/latest?base=${baseCurrency}`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}

export async function generateHistoricalData(baseCurrency: string, targetCurrency: string, days: number): Promise<HistoricalRate[]> {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const url = `${BASE_URL}/${formatDate(startDate)}..${formatDate(endDate)}?base=${baseCurrency}&symbols=${targetCurrency}`;

    // 24 hour cache for historical data points
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) throw new Error('Failed to fetch historical data');

    const data = await response.json();

    const historyData = Object.entries(data.rates).map(([date, rates]: [string, any]) => ({
      date: date,
      rate: rates[targetCurrency]
    }));

    return historyData;
  } catch (error) {
    console.error('Error generating historical data:', error);
    return [];
  }
}
