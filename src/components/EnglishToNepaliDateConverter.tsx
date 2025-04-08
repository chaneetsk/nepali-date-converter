'use client';

import { useState, useEffect } from 'react';
import { englishMonths, convertADToBS, shortEnglishMonths } from '@/utils/dateConverter';
import { ConversionResult } from '@/components/DateConverter';
import { useHistory } from '@/context/HistoryContext';

interface ValidationErrors {
  year?: string;
  day?: string;
}

export default function EnglishToNepaliDateConverter() {
  const [englishYear, setEnglishYear] = useState('');
  const [englishMonth, setEnglishMonth] = useState('');
  const [englishDay, setEnglishDay] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const { addToHistory } = useHistory();

  useEffect(() => {
    const now = new Date();
    setEnglishYear(now.getFullYear().toString());
    setEnglishMonth((now.getMonth() + 1).toString());
    setEnglishDay(now.getDate().toString());
  }, []);

  const validateYear = (year: string): string | undefined => {
    const yearNum = parseInt(year);
    if (yearNum < 1944 || yearNum > 2090) {
      return 'Year must be between 1944 and 2034';
    }
    return undefined;
  };

  const validateDay = (day: string): string | undefined => {
    const dayNum = parseInt(day);
    if (dayNum < 1 || dayNum > 31) {
      return 'Day must be between 1 and 31';
    }
    return undefined;
  };

  const validateEnglishDate = (year: string, month: string, day: string): boolean => {
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return (
      date.getFullYear() === parseInt(year) &&
      date.getMonth() === parseInt(month) - 1 &&
      date.getDate() === parseInt(day)
    );
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEnglishYear(value);
    const yearError = validateYear(value);
    setValidationErrors((prev) => ({ ...prev, year: yearError }));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEnglishDay(value);
    const dayError = validateDay(value);
    setValidationErrors((prev) => ({ ...prev, day: dayError }));
  };

  const handleEnglishToNepaliConversion = () => {
    if (!validateEnglishDate(englishYear, englishMonth, englishDay)) {
      setError('Invalid English date');
      return;
    }

    const date = new Date(parseInt(englishYear), parseInt(englishMonth) - 1, parseInt(englishDay));

    const conversion = convertADToBS(date);

    if (conversion.success && conversion.result) {
      setResult(conversion.result as ConversionResult);
      setError(null);
      setValidationErrors({});
      addToHistory(
        `${englishDay}-${shortEnglishMonths[parseInt(englishMonth) - 1]}-${englishYear}`,
        `${conversion.result.formattedForHistory}`,
        'english-to-nepali',
      );
    } else {
      setResult(null);
      setError(conversion.error || 'Conversion failed');
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Day</label>
          <input
            type="number"
            min="1"
            max="31"
            value={englishDay}
            onChange={handleDayChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.day ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {validationErrors.day && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.day}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Month</label>
          <select
            value={englishMonth}
            onChange={(e) => setEnglishMonth(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select Month</option>
            {englishMonths.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year (AD)</label>
          <input
            type="number"
            value={englishYear}
            onChange={handleYearChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.year ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {validationErrors.year && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.year}</p>
          )}
        </div>
      </div>

      <button
        onClick={handleEnglishToNepaliConversion}
        disabled={!!validationErrors.year || !!validationErrors.day}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          validationErrors.year || validationErrors.day
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white'
        }`}
      >
        Convert to Nepali Date
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
    </>
  );
}
