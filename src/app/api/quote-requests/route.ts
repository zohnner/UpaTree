import { NextResponse } from "next/server";
import { quoteRequestsStore } from "@/lib/store";
import type { QuoteRequest } from "@/lib/types";

// Backed by a local file store that changes on every write, so this
// route must not be statically cached.
export const dynamic = "force-dynamic";

export async function GET() {
  const requests = await quoteRequestsStore.list();
  return NextResponse.json(requests);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { name, phone, email, address, serviceType, message } = body ?? {};

  if (!name || !phone || !address || !serviceType) {
    return NextResponse.json(
      { error: "Name, phone, address, and service type are required." },
      { status: 400 }
    );
  }

  const newRequest: QuoteRequest = {
    id: crypto.randomUUID(),
    name,
    phone,
    email: email ?? "",
    address,
    serviceType,
    message: message ?? "",
    createdAt: new Date().toISOString(),
  };

  const existing = await quoteRequestsStore.list();
  await quoteRequestsStore.save([newRequest, ...existing]);

  // TODO: send an email/SMS notification to the office once a
  // notification provider (e.g. Resend, Twilio) is wired up.

  return NextResponse.json(newRequest, { status: 201 });
}
