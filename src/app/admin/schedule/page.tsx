import { jobsStore } from "@/lib/store";
import ScheduleBoard from "@/components/admin/ScheduleBoard";

// This reads from a local file store on every request, so the route must
// stay dynamic rather than being prerendered at build time.
export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const jobs = await jobsStore.list();

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
