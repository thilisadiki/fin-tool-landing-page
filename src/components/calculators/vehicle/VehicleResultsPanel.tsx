import { motion } from 'framer-motion';
import { DollarSign, Wallet, ShieldCheck, Banknote, FileText, Receipt } from 'lucide-react';
import { formatZAR } from '@/lib/formatters';
import type { VehicleFinanceResult } from '@/lib/calculators/vehicleCalculator';

interface VehicleResultsPanelProps {
  result: VehicleFinanceResult;
}

const RESULT_CARDS = [
  {
    key: 'monthly',
    label: 'Monthly Installment',
    icon: DollarSign,
    color: 'from-blue-500 to-indigo-600',
    getValue: (r: VehicleFinanceResult) => formatZAR(r.monthlyPayment),
  },
  {
    key: 'principal',
    label: 'Principal Financed',
    icon: ShieldCheck,
    color: 'from-emerald-500 to-teal-600',
    getValue: (r: VehicleFinanceResult) => formatZAR(r.principalFinanced),
  },
  {
    key: 'interest',
    label: 'Total Interest',
    icon: Banknote,
    color: 'from-amber-500 to-orange-600',
    getValue: (r: VehicleFinanceResult) => formatZAR(r.totalInterest),
  },
  {
    key: 'total',
    label: 'Total Amount Paid',
    icon: Wallet,
    color: 'from-purple-500 to-pink-600',
    getValue: (r: VehicleFinanceResult) => formatZAR(r.totalAmountPaid),
  },
  {
    key: 'initiation',
    label: 'Initiation Fee',
    icon: FileText,
    color: 'from-teal-500 to-cyan-600',
    getValue: (r: VehicleFinanceResult) => formatZAR(r.initiationFee),
  },
  {
    key: 'service',
    label: 'Monthly Service Fee',
    icon: Receipt,
    color: 'from-slate-500 to-gray-600',
    getValue: (r: VehicleFinanceResult) => formatZAR(r.monthlyServiceFee),
  },
] as const;

export default function VehicleResultsPanel({ result }: VehicleResultsPanelProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {RESULT_CARDS.map((card, index) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="dark:bg-slate-800/50 bg-slate-100 rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">{card.label}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{card.getValue(result)}</p>
        </motion.div>
      ))}
    </div>
  );
}
