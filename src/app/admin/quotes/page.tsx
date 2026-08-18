import { quoteRequestsRepo } from "@/lib/store";

// Reads from Cloudflare D1 on every request, so this route must stay
// dynamic rather than being prerendered at build time.
export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  const quotes = await quoteRequestsRepo.list();

  return (
    <div>
      <p className="mb-6 text-forest-600">
        Requests submitted through the public site&apos;s quote form, newest
        first.
      </p>

      {quotes.length === 0 ? (
        <p className="text-forest-500">No quote requests yet.</p>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-forest-800">{q.name}</p>
                  <p className="text-sm text-forest-600">
                    {q.serviceType} · {q.address}
                  </p>
                  <p className="text-sm text-forest-500">
                    {q.phone}
                    {q.email ? ` · ${q.email}` : ""}
                  </p>
                  {q.message && (
                    <p className="mt-2 text-sm italic text-forest-600">
                      &ldquo;{q.message}&rdquo;
                    </p>
                  )}
                </div>
                <p className="whitespace-nowrap text-xs text-forest-400">
                  {new Date(q.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
