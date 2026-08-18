export type JobStatus = "requested" | "scheduled" | "in-progress" | "completed" | "cancelled";

export interface Job {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  serviceType: string;
  date: string; // ISO date, e.g. 2026-08-21
  time: string; // e.g. "9:00 AM"
  crew: string;
  status: JobStatus;
  notes?: string;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  message?: string;
  createdAt: string;
}
