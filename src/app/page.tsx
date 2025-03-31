'use client';

import { useState } from 'react';
import NepaliDateConverter from '@/components/NepaliDateConverter';
import Header from '@/components/Header';

export default function Home() {
  const [conversionType, setConversionType] = useState<'nepali-to-english' | 'english-to-nepali'>('nepali-to-english');

  const handleNepaliToEnglishConversion = (year: string, month: string, day: string) => {
    // TODO: Implement actual conversion logic
    console.log('Converting:', { year, month, day });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-3xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#8B5CF6] mb-4">Nepali Date Converter</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Easily convert dates between Nepali (BS) and English (AD) calendars with our simple, intuitive tool.
          </p>
        </div>

        <div className="w-full max-w-3xl mb-8">
          <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setConversionType('nepali-to-english')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                conversionType === 'nepali-to-english'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Nepali → English
            </button>
            <button
              onClick={() => setConversionType('english-to-nepali')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                conversionType === 'english-to-nepali'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              English → Nepali
            </button>
          </div>
        </div>

        <div className="w-full max-w-3xl">
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {conversionType === 'nepali-to-english'
                ? 'Nepali to English Date Converter'
                : 'English to Nepali Date Converter'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {conversionType === 'nepali-to-english'
                ? 'Convert Nepali calendar (BS) dates to English calendar (AD) dates'
                : 'Convert English calendar (AD) dates to Nepali calendar (BS) dates'}
            </p>

            {conversionType === 'nepali-to-english' ? (
              <NepaliDateConverter onConvert={handleNepaliToEnglishConversion} />
            ) : (
              // TODO: Add English to Nepali conversion form
              <div></div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
