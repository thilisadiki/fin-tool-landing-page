import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { generateHistoricalData, type HistoricalRate } from '@/lib/calculators/currencyApi';

interface CurrencyChartProps {
  fromCurrency: string;
  toCurrency: string;
}

type TimePeriod = '1w' | '1m' | '6m' | '1y' | '5y';

const PERIOD_MAP: Record<TimePeriod, number> = {
  '1w': 7,
  '1m': 30,
  '6m': 180,
  '1y': 365,
  '5y': 1825
};

export default function CurrencyChart({ fromCurrency, toCurrency }: CurrencyChartProps) {
  const [period, setPeriod] = useState<TimePeriod>('1m');
  const [data, setData] = useState<HistoricalRate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadData() {
      setIsLoading(true);
      const days = PERIOD_MAP[period];
      const history = await generateHistoricalData(fromCurrency, toCurrency, days);
      
      if (active) {
        setData(history);
        setIsLoading(false);
      }
    }

    // Skip charting if identical
    if (fromCurrency !== toCurrency) {
      loadData();
    } else {
      setData([]);
    }

    return () => { active = false; };
  }, [fromCurrency, toCurrency, period]);

  // If same currency, no chart makes sense
  if (fromCurrency === toCurrency) return null;

  const isPositiveTrend = data.length >= 2 && data[data.length - 1].rate >= data[0].rate;

  return (
    <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">
            {fromCurrency} to {toCurrency} Chart
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            Exchange rate history
            {data.length > 0 && (
              isPositiveTrend ? (
                <TrendingUp className="w-4 h-4 text-emerald-500 ml-2" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-500 ml-2" />
              )
            )}
          </p>
        </div>

        <div className="flex bg-background border border-border rounded-lg p-1 w-full sm:w-auto">
          {(['1w', '1m', '6m', '1y', '5y'] as TimePeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                period === p
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : data.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No historical data available for this pair.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositiveTrend ? '#10b981' : '#f43f5e'} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isPositiveTrend ? '#10b981' : '#f43f5e'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(val) => {
                  const d = new Date(val);
                  return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
                }}
                minTickGap={30}
              />
              <YAxis 
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(val) => val.toFixed(2)}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                formatter={(value: number) => [value.toFixed(4), 'Rate']}
                labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              />
              <Area 
                type="monotone" 
                dataKey="rate" 
                stroke={isPositiveTrend ? '#10b981' : '#f43f5e'} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRate)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
