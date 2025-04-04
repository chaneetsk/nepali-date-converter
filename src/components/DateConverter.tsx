import { useState, useEffect } from 'react';
import { nepaliMonths, convertBSToAD, getCurrentNepaliDate } from '@/utils/dateConverter';

interface ConversionResult {
  year: number;
  month: number;
  date: number;
  formatted: string;
}

interface ValidationErrors {
  year?: string;
  day?: string;
}

export default function DateConverter() {
  const [nepaliYear, setNepaliYear] = useState('');
  const [nepaliMonth, setNepaliMonth] = useState('');
  const [nepaliDay, setNepaliDay] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Set current Nepali date on component mount
  useEffect(() => {
    const currentDate = getCurrentNepaliDate();
    setNepaliYear(currentDate.year);
    setNepaliMonth(currentDate.month);
    setNepaliDay(currentDate.date);
  }, []);

  const validateYear = (year: string): string | undefined => {
    const yearNum = parseInt(year);
    // if (isNaN(yearNum)) {
    //   return 'Year must be a number';
    // }
    if (yearNum < 2000 || yearNum > 2090) {
      return 'Year must be between 2000 and 2090';
    }
    return undefined;
  };

  const validateDay = (day: string): string | undefined => {
    const dayNum = parseInt(day);
    // if (isNaN(dayNum)) {
    //   return 'Day must be a number';
    // }
    if (dayNum < 1 || dayNum > 32) {
      return 'Day must be between 1 and 32';
    }
    return undefined;
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNepaliYear(value);
    const yearError = validateYear(value);
    setValidationErrors((prev) => ({ ...prev, year: yearError }));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNepaliDay(value);
    const dayError = validateDay(value);
    setValidationErrors((prev) => ({ ...prev, day: dayError }));
  };

  const handleConversion = () => {
    // Validate all fields before conversion
    const yearError = validateYear(nepaliYear);
    const dayError = validateDay(nepaliDay);

    if (yearError || dayError) {
      setValidationErrors({ year: yearError, day: dayError });
      return;
    }

    const conversion = convertBSToAD(nepaliYear, nepaliMonth, nepaliDay);

    if (conversion.success && conversion.result) {
      setResult(conversion.result as ConversionResult);
      setError(null);
      setValidationErrors({});
    } else {
      setResult(null);
      setError(conversion.error || 'Conversion failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year (BS)</label>
          <input
            type="number"
            min="1900"
            max="2100"
            value={nepaliYear}
            onChange={handleYearChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.year ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {validationErrors.year && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.year}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Month</label>
          <select
            value={nepaliMonth}
            onChange={(e) => setNepaliMonth(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="" className="text-gray-500 dark:text-gray-400">
              Select Month
            </option>
            {nepaliMonths.map((month) => (
              <option key={month} value={month} className="text-gray-900 dark:text-white">
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Day</label>
          <input
            type="number"
            min="1"
            max="32"
            value={nepaliDay}
            onChange={handleDayChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.day ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {validationErrors.day && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.day}</p>
          )}
        </div>
      </div>

      <button
        onClick={handleConversion}
        disabled={!!validationErrors.year || !!validationErrors.day}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          validationErrors.year || validationErrors.day
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white'
        }`}
      >
        Convert to English Date
      </button>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <h3 className="text-lg font-medium text-purple-900 dark:text-purple-100 mb-1">Converted Date</h3>
          <p className="text-purple-800 dark:text-purple-200">{result.formatted}</p>
        </div>
      )}
    </div>
  );
}
