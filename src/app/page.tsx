'use client';

import { useState } from 'react';
import NepaliDateConverter from '@/components/NepaliDateConverter';
import ConversionTypeTabs from '@/components/ConversionTypeTabs';

export default function Home() {
  const [conversionType, setConversionType] = useState<'nepali-to-english' | 'english-to-nepali'>('nepali-to-english');

  return (
    <main className="flex-1 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#8B5CF6] mb-4">Nepali Date Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Easily convert dates between Nepali (BS) and English (AD) calendars with our simple tool.
        </p>
      </div>

      <div className="w-full max-w-3xl mb-8">
        <ConversionTypeTabs conversionType={conversionType} onConversionTypeChange={setConversionType} />
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
            <NepaliDateConverter />
          ) : (
            // TODO: Add English to Nepali conversion form
            <div></div>
          )}
        </div>
      </div>
    </main>
  );
}
