import Link from "next/link";
import { company, services, testimonials } from "@/lib/content";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-forest-800 to-forest-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-wide text-forest-200">
            Locally owned &middot; Kansas City, MO
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {company.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-forest-100">
            From routine pruning to emergency storm cleanup, Up A Tree LLC
            keeps your property safe and looking great — free estimates,
            fully insured crews, same-week scheduling.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-amber-accent px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-amber-accent-dark"
            >
              Request a Free Quote
            </Link>
            <a
              href={company.phoneHref}
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call {company.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-forest-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 text-center text-sm font-semibold text-forest-700 sm:px-6 md:grid-cols-4">
          <div>Licensed & Insured</div>
          <div>Free On-Site Estimates</div>
          <div>Same-Week Availability</div>
          <div>Emergency Storm Response</div>
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-forest-800">Our Services</h2>
            <p className="mt-2 max-w-xl text-forest-600">
              Full-service tree care for homes and businesses across the
              Kansas City metro.
            </p>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold text-forest-600 hover:text-forest-800"
          >
            View all services →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-forest-800">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-forest-600">
                {service.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-forest-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-bold text-forest-800">
            What Kansas City Says
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.author}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <p className="text-forest-700">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-semibold text-forest-500">
                  {t.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-forest-800">
          Ready to get your trees taken care of?
        </h2>
        <p className="mt-3 text-forest-600">
          Get a free, no-obligation estimate from our crew.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-forest-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-forest-700"
          >
            Request a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
