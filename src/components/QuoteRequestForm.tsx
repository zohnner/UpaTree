"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-forest-200 bg-forest-50 p-8 text-center">
        <p className="text-2xl" aria-hidden>
          ✅
        </p>
        <h3 className="mt-2 text-xl font-bold text-forest-800">
          Thanks — we got it!
        </h3>
        <p className="mt-2 text-forest-600">
          Someone from our team will reach out shortly to confirm details and
          schedule your free estimate.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-forest-600 hover:text-forest-800"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
        />
        <div>
          <label
            htmlFor="serviceType"
            className="block text-sm font-medium text-forest-700"
          >
            Service needed
          </label>
          <select
            id="serviceType"
            name="serviceType"
            required
            defaultValue=""
            className="mt-1 w-full rounded-lg border border-forest-200 bg-white px-3 py-2 text-sm text-forest-800 focus:border-forest-500 focus:outline-none"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Not sure">Not sure / other</option>
          </select>
        </div>
      </div>

      <Field label="Property address" name="address" required />

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-forest-700"
        >
          Tell us about the job (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-forest-200 bg-white px-3 py-2 text-sm text-forest-800 focus:border-forest-500 focus:outline-none"
          placeholder="e.g. Large oak leaning toward the house after last week's storm"
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-forest-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request Free Quote"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-forest-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1 w-full rounded-lg border border-forest-200 bg-white px-3 py-2 text-sm text-forest-800 focus:border-forest-500 focus:outline-none"
      />
    </div>
  );
}
