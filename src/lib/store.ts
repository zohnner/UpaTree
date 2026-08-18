import { promises as fs } from "fs";
import path from "path";

// Lightweight JSON-file-backed storage for local development.
// This is a placeholder persistence layer: swap for a real database
// (Postgres, SQLite via Prisma, etc.) once the admin platform grows
// beyond a single-instance deployment.

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readCollection<T>(file: string, seed: T[]): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    await fs.writeFile(filePath, JSON.stringify(seed, null, 2), "utf-8");
    return seed;
  }
}

async function writeCollection<T>(file: string, items: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
}

export const jobsStore = {
  list: () => readCollection("jobs.json", seedJobs),
  save: (items: Awaited<ReturnType<typeof readCollection<import("./types").Job>>>) =>
    writeCollection("jobs.json", items),
};

export const quoteRequestsStore = {
  list: () => readCollection("quote-requests.json", [] as import("./types").QuoteRequest[]),
  save: (items: import("./types").QuoteRequest[]) => writeCollection("quote-requests.json", items),
};

import type { Job } from "./types";

const seedJobs: Job[] = [
  {
    id: "seed-1",
    customerName: "Karen Whitfield",
    phone: "(816) 555-0142",
    address: "4521 W 71st St, Prairie Village, KS",
    serviceType: "Tree Removal",
    date: nextWeekday(1),
    time: "8:00 AM",
    crew: "Crew A",
    status: "scheduled",
    notes: "Large silver maple, close to power line. Bring bucket truck.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    customerName: "Marcus Denny",
    phone: "(913) 555-0198",
    address: "1180 NE Vivion Rd, Kansas City, MO",
    serviceType: "Trimming / Pruning",
    date: nextWeekday(2),
    time: "10:30 AM",
    crew: "Crew B",
    status: "scheduled",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-3",
    customerName: "Angela Ruiz",
    phone: "(816) 555-0170",
    address: "902 W 39th St, Kansas City, MO",
    serviceType: "Stump Grinding",
    date: nextWeekday(4),
    time: "1:00 PM",
    crew: "Crew A",
    status: "requested",
    notes: "Two stumps in backyard, confirm gate access code.",
    createdAt: new Date().toISOString(),
  },
];

function nextWeekday(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}
