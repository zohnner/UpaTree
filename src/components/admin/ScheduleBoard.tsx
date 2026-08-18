"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { Job, JobStatus } from "@/lib/types";

const STATUS_LABELS: Record<JobStatus, string> = {
  requested: "Requested",
  scheduled: "Scheduled",
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_STYLES: Record<JobStatus, string> = {
  requested: "bg-amber-accent/15 text-amber-accent-dark",
  scheduled: "bg-forest-100 text-forest-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function ScheduleBoard({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const jobsByDate = useMemo(() => {
    const groups = new Map<string, Job[]>();
    for (const job of jobs) {
      const list = groups.get(job.date) ?? [];
      list.push(job);
      groups.set(job.date, list);
    }
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [jobs]);

  async function updateStatus(id: string, status: JobStatus) {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status } : job))
    );
    await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function handleAddJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const newJob: Job = await res.json();
      setJobs((prev) =>
        [...prev, newJob].sort((a, b) =>
          a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)
        )
      );
      form.reset();
      setFormOpen(false);
    }
    setSubmitting(false);
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={() => setFormOpen((v) => !v)}
          className="rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-700"
        >
          {formOpen ? "Cancel" : "+ Add Job"}
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleAddJob}
          className="mb-8 grid gap-4 rounded-2xl border border-forest-100 bg-white p-6 shadow-sm sm:grid-cols-2"
        >
          <TextField label="Customer name" name="customerName" required />
          <TextField label="Phone" name="phone" type="tel" />
          <TextField
            label="Address"
            name="address"
            required
            className="sm:col-span-2"
          />
          <TextField label="Service type" name="serviceType" required />
          <TextField label="Crew" name="crew" placeholder="Crew A" />
          <TextField label="Date" name="date" type="date" required />
          <TextField label="Time" name="time" placeholder="9:00 AM" />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-forest-700">
              Notes
            </label>
            <textarea
              name="notes"
              rows={2}
              className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-forest-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-forest-700 disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Save Job"}
            </button>
          </div>
        </form>
      )}

      {jobsByDate.length === 0 && (
        <p className="text-forest-500">No jobs scheduled yet.</p>
      )}

      <div className="space-y-8">
        {jobsByDate.map(([date, jobsOnDate]) => (
          <div key={date}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-forest-500">
              {formatDate(date)}
            </h2>
            <div className="mt-3 space-y-3">
              {jobsOnDate.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-forest-800">
                        {job.time ? `${job.time} — ` : ""}
                        {job.customerName}
                      </p>
                      <p className="text-sm text-forest-600">
                        {job.serviceType} · {job.address}
                      </p>
                      {job.phone && (
                        <p className="text-sm text-forest-500">{job.phone}</p>
                      )}
                      {job.notes && (
                        <p className="mt-1 text-sm italic text-forest-500">
                          {job.notes}
                        </p>
                      )}
                      <p className="mt-1 text-xs font-medium text-forest-400">
                        Crew: {job.crew}
                      </p>
                    </div>

                    <select
                      value={job.status}
                      onChange={(e) =>
                        updateStatus(job.id, e.target.value as JobStatus)
                      }
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold ${STATUS_STYLES[job.status]}`}
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TextField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-forest-700">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
      />
    </div>
  );
}

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
