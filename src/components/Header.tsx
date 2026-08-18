import Link from "next/link";
import { company } from "@/lib/content";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/service-area", label: "Service Area" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9 shrink-0" />
          <span className="font-bold text-lg text-forest-800 tracking-tight">
            {company.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-forest-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-forest-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={company.phoneHref}
          className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest-700"
        >
          Call {company.phone}
        </a>
      </div>

      <nav className="flex md:hidden items-center gap-4 overflow-x-auto border-t border-forest-100 px-4 py-2 text-sm font-medium text-forest-700">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
