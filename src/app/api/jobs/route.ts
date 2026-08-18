import { NextResponse } from "next/server";
import { jobsStore } from "@/lib/store";
import type { Job } from "@/lib/types";

// Backed by a local file store that changes on every write, so this
// route must not be statically cached.
export const dynamic = "force-dynamic";

export async function GET() {
  const jobs = await jobsStore.list();
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { customerName, phone, address, serviceType, date, time, crew, notes } =
    body ?? {};

  if (!customerName || !address || !serviceType || !date) {
    return NextResponse.json(
      { error: "Customer name, address, service type, and date are required." },
      { status: 400 }
    );
  }

  const newJob: Job = {
    id: crypto.randomUUID(),
    customerName,
    phone: phone ?? "",
    address,
    serviceType,
    date,
    time: time ?? "",
    crew: crew ?? "Unassigned",
    status: "scheduled",
    notes: notes ?? "",
    createdAt: new Date().toISOString(),
  };

  const existing = await jobsStore.list();
  const updated = [...existing, newJob].sort((a, b) =>
    a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)
  );
  await jobsStore.save(updated);

  return NextResponse.json(newJob, { status: 201 });
}
