import ToggleTheme from './ToggleTheme';
import Logo from './Logo';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <ToggleTheme />
      </div>
    </header>
  );
}
