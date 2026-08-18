import Link from "next/link";
import { company } from "@/lib/content";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-forest-100 bg-forest-900 text-forest-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-9 w-9 shrink-0" bg="#faf8f3" fg="#1c4224" />
            <p className="text-lg font-bold text-white">{company.name}</p>
          </div>
          <p className="mt-2 text-sm text-forest-200">{company.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Contact</p>
          <ul className="mt-2 space-y-1 text-forest-200">
            <li>
              <a href={company.phoneHref} className="hover:text-white">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-white">
                {company.email}
              </a>
            </li>
            <li>{company.address}</li>
            <li>{company.hours}</li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-2 space-y-1 text-forest-200">
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/service-area" className="hover:text-white">
                Service Area
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Request a Free Quote
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-800 px-4 py-4 text-center text-xs text-forest-300 sm:px-6">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </div>
    </footer>
  );
}
