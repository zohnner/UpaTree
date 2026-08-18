import { NextResponse } from "next/server";
import { jobsRepo } from "@/lib/store";

// Reads/writes Cloudflare D1, which must always be queried live.
export const dynamic = "force-dynamic";

export async function GET() {
  const jobs = await jobsRepo.list();
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string | undefined>;
  const { customerName, phone, address, serviceType, date, time, crew, notes } =
    body ?? {};

  if (!customerName || !address || !serviceType || !date) {
    return NextResponse.json(
      { error: "Customer name, address, service type, and date are required." },
      { status: 400 }
    );
  }

  const newJob = await jobsRepo.create({
    customerName,
    phone,
    address,
    serviceType,
    date,
    time,
    crew,
    notes,
  });

  return NextResponse.json(newJob, { status: 201 });
}
