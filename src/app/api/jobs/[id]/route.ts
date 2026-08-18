import { NextResponse } from "next/server";
import { jobsStore } from "@/lib/store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const jobs = await jobsStore.list();
  const index = jobs.findIndex((job) => job.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }

  jobs[index] = { ...jobs[index], ...body };
  await jobsStore.save(jobs);

  return NextResponse.json(jobs[index]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const jobs = await jobsStore.list();
  const updated = jobs.filter((job) => job.id !== id);

  if (updated.length === jobs.length) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }

  await jobsStore.save(updated);
  return NextResponse.json({ ok: true });
}
