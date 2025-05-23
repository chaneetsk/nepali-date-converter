'use client';

import { useState, useEffect } from 'react';
import { nepaliMonths, convertBSToAD, getCurrentNepaliDate } from '@/utils/dateConverter';
import { ConversionResult, ValidationErrors } from './DateConverter';
import { useHistory } from '@/context/HistoryContext';

export default function NepaliToEnglishDateConverter() {
  const [nepaliYear, setNepaliYear] = useState('');
  const [nepaliMonth, setNepaliMonth] = useState('');
  const [nepaliDay, setNepaliDay] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const { addToHistory } = useHistory();

  useEffect(() => {
    const currentDate = getCurrentNepaliDate();
    setNepaliYear(currentDate.year);
    setNepaliMonth(currentDate.month);
    setNepaliDay(currentDate.date);
  }, []);

  const validateYear = (year: string): string | undefined => {
    const yearNum = parseInt(year);
    if (yearNum < 2000 || yearNum > 2090) {
      return 'Year must be between 2000 and 2090';
    }
    return undefined;
  };

  const validateDay = (day: string): string | undefined => {
    const dayNum = parseInt(day);
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
      addToHistory(
        `${nepaliYear}-${nepaliMonth}-${nepaliDay}`,
        `${conversion.result.formattedForHistory}`,
        'nepali-to-english',
      );
    } else {
      setResult(null);
      setError(conversion.error || 'Conversion failed');
    }
  };

  return (
    <form
      role="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleConversion();
      }}
      aria-label="Nepali to English Date Converter"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="nepaliYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Year (BS)
          </label>
          <input
            id="nepaliYear"
            type="number"
            min="2000"
            max="2090"
            value={nepaliYear}
            onChange={handleYearChange}
            aria-invalid={!!validationErrors.year}
            aria-describedby={validationErrors.year ? 'year-error' : undefined}
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.year ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {validationErrors.year && (
            <p id="year-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {validationErrors.year}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="nepaliMonth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Month
          </label>
          <select
            id="nepaliMonth"
            value={nepaliMonth}
            onChange={(e) => setNepaliMonth(e.target.value)}
            aria-label="Select Nepali month"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select Month</option>
            {nepaliMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="nepaliDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Day
          </label>
          <input
            id="nepaliDay"
            type="number"
            min="1"
            max="32"
            value={nepaliDay}
            onChange={handleDayChange}
            aria-invalid={!!validationErrors.day}
            aria-describedby={validationErrors.day ? 'day-error' : undefined}
            className={`w-full px-4 py-2 rounded-lg border ${
              validationErrors.day ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {validationErrors.day && (
            <p id="day-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {validationErrors.day}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!!validationErrors.year || !!validationErrors.day}
        aria-label="Convert to English Date"
        className={`w-full py-3 rounded-lg font-medium mb-6 transition-colors ${
          validationErrors.year || validationErrors.day
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white'
        }`}
      >
        Convert to English Date
      </button>

      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {result && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
        >
          <h3 className="text-lg font-medium text-purple-900 dark:text-purple-100 mb-1">Converted Date</h3>
          <p className="text-purple-800 dark:text-purple-200">{result.formatted}</p>
        </div>
      )}
    </form>
  );
}
