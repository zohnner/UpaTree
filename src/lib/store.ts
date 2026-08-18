import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Job, JobStatus, QuoteRequest } from "./types";

// Cloudflare D1-backed data access (SQLite). Locally, `next dev` reaches
// the same binding via Miniflare emulation (see initOpenNextCloudflareForDev()
// in next.config.ts); in production it's the real D1 database bound as
// `DB` in wrangler.jsonc. Run migrations/0001_init.sql against both
// before first use — see README.md.

function db() {
  return getCloudflareContext().env.DB;
}

function rowToJob(row: Record<string, unknown>): Job {
  return {
    id: row.id as string,
    customerName: row.customer_name as string,
    phone: (row.phone as string) ?? "",
    address: row.address as string,
    serviceType: row.service_type as string,
    date: row.date as string,
    time: (row.time as string) ?? "",
    crew: (row.crew as string) ?? "Unassigned",
    status: row.status as JobStatus,
    notes: (row.notes as string) ?? "",
    createdAt: row.created_at as string,
  };
}

function rowToQuoteRequest(row: Record<string, unknown>): QuoteRequest {
  return {
    id: row.id as string,
    name: row.name as string,
    phone: row.phone as string,
    email: (row.email as string) ?? "",
    address: row.address as string,
    serviceType: row.service_type as string,
    message: (row.message as string) ?? "",
    createdAt: row.created_at as string,
  };
}

export interface NewJobInput {
  customerName: string;
  phone?: string;
  address: string;
  serviceType: string;
  date: string;
  time?: string;
  crew?: string;
  notes?: string;
}

export const jobsRepo = {
  async list(): Promise<Job[]> {
    const { results } = await db()
      .prepare("SELECT * FROM jobs ORDER BY date ASC, time ASC")
      .all<Record<string, unknown>>();
    return results.map(rowToJob);
  },

  async create(input: NewJobInput): Promise<Job> {
    const job: Job = {
      id: crypto.randomUUID(),
      customerName: input.customerName,
      phone: input.phone ?? "",
      address: input.address,
      serviceType: input.serviceType,
      date: input.date,
      time: input.time ?? "",
      crew: input.crew ?? "Unassigned",
      status: "scheduled",
      notes: input.notes ?? "",
      createdAt: new Date().toISOString(),
    };

    await db()
      .prepare(
        `INSERT INTO jobs (id, customer_name, phone, address, service_type, date, time, crew, status, notes, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        job.id,
        job.customerName,
        job.phone,
        job.address,
        job.serviceType,
        job.date,
        job.time,
        job.crew,
        job.status,
        job.notes,
        job.createdAt
      )
      .run();

    return job;
  },

  async updateStatus(id: string, status: JobStatus): Promise<Job | null> {
    const result = await db()
      .prepare("UPDATE jobs SET status = ? WHERE id = ?")
      .bind(status, id)
      .run();

    if (!result.meta.changes) return null;

    const row = await db()
      .prepare("SELECT * FROM jobs WHERE id = ?")
      .bind(id)
      .first<Record<string, unknown>>();

    return row ? rowToJob(row) : null;
  },

  async remove(id: string): Promise<boolean> {
    const result = await db().prepare("DELETE FROM jobs WHERE id = ?").bind(id).run();
    return Boolean(result.meta.changes);
  },
};

export interface NewQuoteRequestInput {
  name: string;
  phone: string;
  email?: string;
  address: string;
  serviceType: string;
  message?: string;
}

export const quoteRequestsRepo = {
  async list(): Promise<QuoteRequest[]> {
    const { results } = await db()
      .prepare("SELECT * FROM quote_requests ORDER BY created_at DESC")
      .all<Record<string, unknown>>();
    return results.map(rowToQuoteRequest);
  },

  async create(input: NewQuoteRequestInput): Promise<QuoteRequest> {
    const quoteRequest: QuoteRequest = {
      id: crypto.randomUUID(),
      name: input.name,
      phone: input.phone,
      email: input.email ?? "",
      address: input.address,
      serviceType: input.serviceType,
      message: input.message ?? "",
      createdAt: new Date().toISOString(),
    };

    await db()
      .prepare(
        `INSERT INTO quote_requests (id, name, phone, email, address, service_type, message, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        quoteRequest.id,
        quoteRequest.name,
        quoteRequest.phone,
        quoteRequest.email,
        quoteRequest.address,
        quoteRequest.serviceType,
        quoteRequest.message,
        quoteRequest.createdAt
      )
      .run();

    return quoteRequest;
  },
};
