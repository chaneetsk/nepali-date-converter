import { useHistory } from '@/context/HistoryContext';
import { CopyIcon } from '@radix-ui/react-icons';

export default function ConversionHistory() {
  const { history } = useHistory();

  if (history.length === 0) return null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <section className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Previous Conversions</h3>
      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.timestamp} className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {item.type === 'nepali-to-english' ? 'BS → AD' : 'AD → BS'}
            </p>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {item.from} <span className="mx-2 text-gray-400">→</span> {item.to}
              </p>
              <button
                onClick={() => copyToClipboard(item.to)}
                className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                         rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                title="Copy result"
              >
                <CopyIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
