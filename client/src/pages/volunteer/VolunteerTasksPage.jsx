import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { formatDate } from "../../lib/formatters";

export function VolunteerTasksPage() {
  const tasks = useAsyncData(async () => {
    const response = await api.get("/volunteers/tasks");
    return response.data.data;
  }, []);

  const rows =
    tasks.data?.map((item) => ({
      id: item._id,
      pickup: item.pickupLocation || "Pending pickup point",
      drop: item.dropLocation || "Pending drop point",
      status: item.status,
      assigned: formatDate(item.createdAt)
    })) || [];

  return (
    <div className="page-stack">
      <PageHero title="Volunteer tasks" description="A simplified field-operations view for delivery progress and assigned allocations." />
      <SectionCard eyebrow="Task queue" title="Assigned work" description="Volunteer workflows stay focused on pickup, handoff, and delivery progress for field execution.">
        <DataState isLoading={tasks.isLoading} error={tasks.error} empty={!rows.length}>
          <DataTable
            columns={[
              { key: "pickup", label: "Pickup" },
              { key: "drop", label: "Drop" },
              { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
              { key: "assigned", label: "Assigned" }
            ]}
            rows={rows}
          />
        </DataState>
      </SectionCard>
    </div>
  );
}
