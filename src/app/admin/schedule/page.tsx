import { jobsRepo } from "@/lib/store";
import ScheduleBoard from "@/components/admin/ScheduleBoard";

// Reads from Cloudflare D1 on every request, so this route must stay
// dynamic rather than being prerendered at build time.
export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const jobs = await jobsRepo.list();

  return (
    <div>
      <p className="mb-6 text-forest-600">
        Upcoming and in-progress jobs, grouped by date. Update a job&apos;s
        status as work moves forward.
      </p>
      <ScheduleBoard initialJobs={jobs} />
    </div>
  );
}
