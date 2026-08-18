import { NextResponse } from "next/server";
import { quoteRequestsRepo } from "@/lib/store";

// Reads/writes Cloudflare D1, which must always be queried live.
export const dynamic = "force-dynamic";

export async function GET() {
  const requests = await quoteRequestsRepo.list();
  return NextResponse.json(requests);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string | undefined>;
  const { name, phone, email, address, serviceType, message } = body ?? {};

  if (!name || !phone || !address || !serviceType) {
    return NextResponse.json(
      { error: "Name, phone, address, and service type are required." },
      { status: 400 }
    );
  }

  const newRequest = await quoteRequestsRepo.create({
    name,
    phone,
    email,
    address,
    serviceType,
    message,
  });

  // TODO: send an email/SMS notification to the office once a
  // notification provider (e.g. Resend, Twilio) is wired up.

  return NextResponse.json(newRequest, { status: 201 });
}
