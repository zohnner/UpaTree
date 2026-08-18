import Link from "next/link";
import { jobsRepo, quoteRequestsRepo } from "@/lib/store";

// Reads from Cloudflare D1 on every request, so this route must stay
// dynamic rather than being prerendered at build time.
export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [jobs, quotes] = await Promise.all([
    jobsRepo.list(),
    quoteRequestsRepo.list(),
  ]);

  const upcoming = jobs.filter((j) => j.status === "scheduled").length;

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <Link
        href="/admin/schedule"
        className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <p className="text-sm font-semibold text-forest-500">Job Schedule</p>
        <p className="mt-2 text-3xl font-extrabold text-forest-800">
          {upcoming}
        </p>
        <p className="mt-1 text-sm text-forest-600">jobs scheduled</p>
      </Link>

      <Link
        href="/admin/quotes"
        className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <p className="text-sm font-semibold text-forest-500">
          Quote Requests
        </p>
        <p className="mt-2 text-3xl font-extrabold text-forest-800">
          {quotes.length}
        </p>
        <p className="mt-1 text-sm text-forest-600">submitted from the site</p>
      </Link>

      <div className="rounded-2xl border border-dashed border-forest-200 bg-white p-6 text-forest-400">
        <p className="text-sm font-semibold">Coming soon</p>
        <p className="mt-2 text-3xl font-extrabold">—</p>
        <p className="mt-1 text-sm">Invoicing & payments</p>
      </div>
    </div>
  );
}
