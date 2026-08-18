import type { Metadata } from "next";
import Link from "next/link";
import { company, serviceAreaCities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Service Area | Up A Tree LLC",
  description:
    "Up A Tree LLC serves the greater Kansas City metro, including Overland Park, Olathe, Lee's Summit, and more.",
};

export default function ServiceAreaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold text-forest-800">Service Area</h1>
      <p className="mt-3 max-w-2xl text-forest-600">
        We proudly serve the {company.serviceAreaSummary}. Don&apos;t see your
        city listed? Reach out — we likely still cover it.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-forest-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-forest-800">
            Cities We Serve
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-forest-700">
            {serviceAreaCities.map((city) => (
              <li key={city} className="flex items-center gap-2">
                <span className="text-forest-400" aria-hidden>
                  📍
                </span>
                {city}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between rounded-2xl bg-forest-50 p-8">
          <div>
            <h2 className="text-xl font-bold text-forest-800">
              Outside the map?
            </h2>
            <p className="mt-2 text-sm text-forest-600">
              We take on jobs beyond our core area on a case-by-case basis,
              especially for larger removal or land-clearing projects. Give
              us a call and we&apos;ll let you know if we can help.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={company.phoneHref}
              className="rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-700"
            >
              Call {company.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-forest-300 px-5 py-2.5 text-sm font-semibold text-forest-700 hover:bg-forest-100"
            >
              Send Us Your Address
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
