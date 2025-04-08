import DateConverter from '@/components/DateConverter';
import ConversionHistory from '@/components/ConversionHistory';

export default function Home() {
  return (
    <main className="flex-1 p-4 md:p-8 flex flex-col items-center mt-10 md:mt-14">
      <div className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#8B5CF6] mb-4">Nepali Date Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Easily convert dates between Nepali (BS) and English (AD) calendars with our simple tool.
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <div className="glass-card p-8">
          <DateConverter />
        </div>
      </div>
      <ConversionHistory />
    </main>
  );
}
