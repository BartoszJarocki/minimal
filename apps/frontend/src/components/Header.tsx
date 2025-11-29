import Link from "next/link";
import { Logo } from "./Logo";

interface HeaderProps {
  hideAccountLink?: boolean;
}

export const Header = ({ hideAccountLink }: HeaderProps) => (
  <header className="flex items-center justify-between">
    <Link href="/" aria-label="Home">
      <Logo className="h-12 w-12" />
    </Link>
    {!hideAccountLink && (
      <Link
        href="/portal"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        My account
      </Link>
    )}
  </header>
);
