import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} NepaliDateConverter.net
          </p>
          <div className="flex gap-4">
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-400 text-sm hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] transition-colors"
            >
              About
            </Link>
            <a
              href="mailto:hello@nepalidateconverter.net"
              className="text-gray-600 dark:text-gray-400 text-sm hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
