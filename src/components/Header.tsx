import ToggleTheme from './ToggleTheme';

export default function Header() {
  return (
    <header className="w-full py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center">
            <span className="text-white font-bold">न</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">NepaliDateConverter</span>
        </div>

        <ToggleTheme />
      </div>
    </header>
  );
}
