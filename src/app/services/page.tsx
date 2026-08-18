import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services | Up A Tree LLC",
  description:
    "Tree removal, trimming, stump grinding, storm response, land clearing, and health consulting across Kansas City.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold text-forest-800">Our Services</h1>
      <p className="mt-3 max-w-2xl text-forest-600">
        Every job starts with a free, honest estimate. Here&apos;s how we help
        Kansas City homeowners and businesses take care of their trees.
      </p>

      <div className="mt-12 space-y-10">
        {services.map((service) => (
          <div
            key={service.slug}
            id={service.slug}
            className="grid gap-6 rounded-2xl border border-forest-100 bg-white p-8 shadow-sm md:grid-cols-3"
          >
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-forest-800">
                {service.name}
              </h2>
              <p className="mt-2 text-sm text-forest-600">
                {service.description}
              </p>
            </div>
            <ul className="md:col-span-2 grid gap-2 self-start sm:grid-cols-2">
              {service.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-sm text-forest-700"
                >
                  <span className="mt-1 text-forest-400" aria-hidden>
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-forest-700 px-8 py-10 text-center text-white">
        <h2 className="text-2xl font-bold">
          Not sure which service you need?
        </h2>
        <p className="mt-2 text-forest-100">
          Tell us what&apos;s going on and we&apos;ll recommend the right fix.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-amber-accent px-6 py-3 font-semibold text-white hover:bg-amber-accent-dark"
        >
          Request a Free Quote
        </Link>
      </div>
    </div>
  );
}
