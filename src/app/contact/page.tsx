import type { Metadata } from "next";
import { company } from "@/lib/content";
import QuoteRequestForm from "@/components/QuoteRequestForm";

export const metadata: Metadata = {
  title: "Contact & Free Quote | Up A Tree LLC",
  description:
    "Request a free tree service estimate from Up A Tree LLC in Kansas City. Call, email, or fill out our quote form.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold text-forest-800">
        Request a Free Quote
      </h1>
      <p className="mt-3 max-w-2xl text-forest-600">
        Tell us a bit about the job and we&apos;ll get back to you to schedule
        a free, no-obligation estimate.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3 rounded-2xl border border-forest-100 bg-white p-8 shadow-sm">
          <QuoteRequestForm />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl bg-forest-50 p-6">
            <h2 className="text-lg font-bold text-forest-800">
              Prefer to talk?
            </h2>
            <p className="mt-2 text-sm text-forest-600">
              Call or email us directly and we&apos;ll get you on the
              schedule.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <a
                  href={company.phoneHref}
                  className="font-semibold text-forest-700 hover:text-forest-900"
                >
                  {company.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="font-semibold text-forest-700 hover:text-forest-900"
                >
                  {company.email}
                </a>
              </p>
              <p className="text-forest-600">{company.hours}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-forest-50 p-6">
            <h2 className="text-lg font-bold text-forest-800">
              Service Area
            </h2>
            <p className="mt-2 text-sm text-forest-600">
              {company.serviceAreaSummary}. Not sure if we cover your
              address? Reach out anyway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
