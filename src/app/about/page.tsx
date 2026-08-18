import type { Metadata } from "next";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | Up A Tree LLC",
  description:
    "Up A Tree LLC is a locally owned tree trimming and removal company serving the Kansas City metro.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold text-forest-800">
        About {company.name}
      </h1>
      <div className="mt-6 space-y-4 text-forest-700">
        <p>
          Up A Tree LLC is a locally owned and operated tree care company
          serving homeowners and businesses across the Kansas City metro. We
          started this company to bring honest pricing, reliable scheduling,
          and genuinely careful work to an industry where those things can be
          hard to find.
        </p>
        <p>
          Our crews are trained in safe climbing and removal techniques and
          show up with the right equipment for the job — whether that&apos;s a
          quick trim near a power line or a full removal of a storm-damaged
          tree leaning on a roof.
        </p>
        <p>
          We&apos;re licensed and insured, and every estimate is free and
          no-obligation. If we tell you a tree doesn&apos;t need to come down,
          we&apos;ll tell you that too.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-forest-100 bg-white p-6 text-center shadow-sm">
          <p className="text-3xl font-extrabold text-forest-700">Licensed</p>
          <p className="mt-1 text-sm text-forest-500">& fully insured</p>
        </div>
        <div className="rounded-2xl border border-forest-100 bg-white p-6 text-center shadow-sm">
          <p className="text-3xl font-extrabold text-forest-700">Free</p>
          <p className="mt-1 text-sm text-forest-500">on-site estimates</p>
        </div>
        <div className="rounded-2xl border border-forest-100 bg-white p-6 text-center shadow-sm">
          <p className="text-3xl font-extrabold text-forest-700">Local</p>
          <p className="mt-1 text-sm text-forest-500">Kansas City owned</p>
        </div>
      </div>
    </div>
  );
}
