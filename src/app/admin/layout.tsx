import Link from "next/link";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-full bg-forest-50">
      <div className="border-b border-amber-accent/30 bg-amber-accent/10 px-4 py-2 text-center text-xs font-medium text-amber-accent-dark">
        Internal tool — not yet protected by login. Do not share this link
        publicly.
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-forest-500">
              Up A Tree — Admin
            </p>
            <h1 className="text-2xl font-bold text-forest-800">
              Operations Dashboard
            </h1>
          </div>
          <nav className="flex gap-4 text-sm font-semibold text-forest-600">
            <Link href="/admin/schedule" className="hover:text-forest-900">
              Job Schedule
            </Link>
            <Link href="/admin/quotes" className="hover:text-forest-900">
              Quote Requests
            </Link>
            <Link href="/" className="hover:text-forest-900">
              ← Public Site
            </Link>
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
}
