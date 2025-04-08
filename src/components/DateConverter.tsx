'use client';

import { useState } from 'react';
import EnglishToNepaliDateConverter from './EnglishToNepaliDateConverter';
import NepaliToEnglishDateConverter from './NepaliToEnglishDateConverter';
import ConversionTypeTabs from './ConversionTypeTabs';

export interface ConversionResult {
  year: number;
  month: number | string;
  date: number;
  formatted: string;
  formattedForHistory: string;
}

export interface ValidationErrors {
  year?: string;
  day?: string;
}

export default function DateConverter() {
  const [conversionType, setConversionType] = useState<'nepali-to-english' | 'english-to-nepali'>('nepali-to-english');

  return (
    <>
      <div className="mb-8">
        <ConversionTypeTabs conversionType={conversionType} onConversionTypeChange={setConversionType} />
      </div>

      <div>
        <h2 className="hidden md:block text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {conversionType === 'nepali-to-english'
            ? 'Nepali to English Date Converter'
            : 'English to Nepali Date Converter'}
        </h2>
        <p className="hidden md:block text-gray-600 dark:text-gray-400 mb-8">
          {conversionType === 'nepali-to-english'
            ? 'Convert Nepali calendar (BS) dates to English calendar (AD) dates'
            : 'Convert English calendar (AD) dates to Nepali calendar (BS) dates'}
        </p>
      </div>

      <div className="space-y-6">
        {conversionType === 'nepali-to-english' ? <NepaliToEnglishDateConverter /> : <EnglishToNepaliDateConverter />}
      </div>
    </>
  );
}
