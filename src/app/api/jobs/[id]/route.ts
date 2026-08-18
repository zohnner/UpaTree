import { NextResponse } from "next/server";
import { jobsRepo } from "@/lib/store";
import type { JobStatus } from "@/lib/types";

const VALID_STATUSES: JobStatus[] = [
  "requested",
  "scheduled",
  "in-progress",
  "completed",
  "cancelled",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as { status?: string };
  const status = body?.status as JobStatus | undefined;

  if (!status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: `Status must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }

  const job = await jobsRepo.updateStatus(id, status);
  if (!job) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }

  return NextResponse.json(job);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const removed = await jobsRepo.remove(id);

  if (!removed) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
