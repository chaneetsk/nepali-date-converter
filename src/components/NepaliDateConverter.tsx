import { useState } from 'react';

const nepaliMonths = [
  'Baisakh',
  'Jestha',
  'Ashadh',
  'Shrawan',
  'Bhadra',
  'Ashwin',
  'Kartik',
  'Mangsir',
  'Poush',
  'Magh',
  'Falgun',
  'Chaitra',
];

interface NepaliDateConverterProps {
  onConvert: (year: string, month: string, day: string) => void;
}

export default function NepaliDateConverter({ onConvert }: NepaliDateConverterProps) {
  const [nepaliYear, setNepaliYear] = useState('2080');
  const [nepaliMonth, setNepaliMonth] = useState('Baisakh');
  const [nepaliDay, setNepaliDay] = useState('15');

  const handleSubmit = () => {
    onConvert(nepaliYear, nepaliMonth, nepaliDay);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year (BS)</label>
          <input
            type="text"
            value={nepaliYear}
            onChange={(e) => setNepaliYear(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Month</label>
          <select
            value={nepaliMonth}
            onChange={(e) => setNepaliMonth(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {nepaliMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Day</label>
          <input
            type="text"
            value={nepaliDay}
            onChange={(e) => setNepaliDay(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-[#8B5CF6] text-white rounded-lg font-medium hover:bg-[#7C3AED] transition-colors"
      >
        Convert to English Date
      </button>
    </div>
  );
}
