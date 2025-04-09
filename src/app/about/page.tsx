import { Metadata } from 'next';
import { CodeIcon, GlobeIcon } from '@radix-ui/react-icons';

export const metadata: Metadata = {
  title: 'Nepali Date Converter - Convert BS to AD | About Us',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-primary">Nepali Date Converter</span>
        </h1>
        <p className="text-2xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">Bridging dates across cultures</p>
      </div>

      {/* Our Story Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">What it does</h2>
        <div className="space-y-4">
          <p className="leading-relaxed text-justify text-gray-600 dark:text-gray-400">
            The Nepali Date Converter app is a simple and reliable tool that lets users convert dates between the Nepali
            (Bikram Sambat) and English (Gregorian) calendars with ease. Designed for anyone needing accurate date
            conversions, the app ensures precision and speed. Its user-friendly interface, clean design, and offline
            capability make it a go-to utility for daily use. Whether you’re filling out official documents, or managing
            academic schedules, this app bridges the gap between two calendar systems. Stay organized and informed with
            just a few taps using the Nepali Date Converter.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border  p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <GlobeIcon className="h-5 w-5 text-primary mr-3" />
              <h3 className="text-xl font-semibold ">Works Offline</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Access date conversions anytime, anywhere - no internet connection required
            </p>
          </div>

          <div className="border  p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <CodeIcon className="h-5 w-5 text-primary mr-3" />
              <h3 className="text-xl font-semibold ">Modern Design</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Clean, intuitive interface with responsive layout that works on all devices
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
