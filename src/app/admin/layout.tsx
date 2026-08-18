import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidSession, SESSION_COOKIE_NAME } from "@/lib/auth";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!(await isValidSession(session))) {
    redirect("/login");
  }

  return (
    <div className="min-h-full bg-forest-50">
      <div className="border-b border-forest-200 bg-forest-100/60 px-4 py-2 text-center text-xs font-medium text-forest-600">
        Internal tool — staff access only.
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
          <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold text-forest-600">
            <Link href="/admin/schedule" className="hover:text-forest-900">
              Job Schedule
            </Link>
            <Link href="/admin/quotes" className="hover:text-forest-900">
              Quote Requests
            </Link>
            <Link href="/" className="hover:text-forest-900">
              ← Public Site
            </Link>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="rounded-full border border-forest-300 px-3 py-1.5 text-forest-700 hover:bg-forest-100"
              >
                Log out
              </button>
            </form>
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
}
