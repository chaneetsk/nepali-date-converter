interface ConversionTypeTabsProps {
  conversionType: 'nepali-to-english' | 'english-to-nepali';
  onConversionTypeChange: (type: 'nepali-to-english' | 'english-to-nepali') => void;
}

export default function ConversionTypeTabs({ conversionType, onConversionTypeChange }: ConversionTypeTabsProps) {
  return (
    <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
      <button
        onClick={() => onConversionTypeChange('nepali-to-english')}
        className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
          conversionType === 'nepali-to-english'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        Nepali → English
      </button>
      <button
        onClick={() => onConversionTypeChange('english-to-nepali')}
        disabled
        className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all cursor-not-allowed opacity-50 ${
          conversionType === 'english-to-nepali'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
            : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        English → Nepali (Coming Soon)
      </button>
    </div>
  );
}
