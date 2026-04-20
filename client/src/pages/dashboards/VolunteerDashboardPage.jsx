import { MetricGrid } from "../../components/common/MetricGrid";
import { PageHero } from "../../components/common/PageHero";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { SectionCard } from "../../components/ui/SectionCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { formatDate, formatNumber } from "../../lib/formatters";

export function VolunteerDashboardPage() {
  const tasks = useAsyncData(async () => {
    const response = await api.get("/volunteers/tasks");
    return response.data.data;
  }, []);

  const notifications = useAsyncData(async () => {
    const response = await api.get("/notifications");
    return response.data.data;
  }, []);

  const taskItems = tasks.data || [];
  const notificationItems = notifications.data || [];

  const metrics = [
    {
      label: "Assigned Tasks",
      value: formatNumber(taskItems.length),
      note: "Total delivery and coordination tasks assigned.",
      badge: "Assigned"
    },
    {
      label: "Active Deliveries",
      value: formatNumber(taskItems.filter((item) => ["assigned", "in_progress", "picked_up"].includes(item.status)).length),
      note: "Tasks currently moving through field execution.",
      badge: "Active"
    },
    {
      label: "Completed Tasks",
      value: formatNumber(taskItems.filter((item) => ["completed", "delivered"].includes(item.status)).length),
      note: "Assignments successfully finished.",
      badge: "Done"
    },
    {
      label: "Latest Updates",
      value: formatNumber(notificationItems.length),
      note: "Recent messages related to task activity and logistics updates.",
      badge: "Inbox"
    }
  ];

  const taskRows = taskItems.slice(0, 5).map((item) => ({
    id: item._id,
    pickup: item.pickupLocation || "Pending pickup point",
    drop: item.dropLocation || "Pending drop point",
    status: item.status,
    assigned: formatDate(item.createdAt)
  }));

  const notificationRows = notificationItems.slice(0, 5).map((item) => ({
    id: item._id,
    title: item.title,
    type: item.type,
    created: formatDate(item.createdAt)
  }));

  return (
    <div className="page-stack">
      <PageHero
        title="Volunteer dashboard"
        description="Stay focused on assigned field work, active deliveries, and the latest coordination updates affecting your response tasks."
      />
      <MetricGrid items={metrics} />

      <div className="dashboard-grid">
        <SectionCard eyebrow="Field queue" title="Assigned tasks" description="Your most recent pickup and delivery assignments with current execution state.">
          <DataState isLoading={tasks.isLoading} error={tasks.error} empty={!taskRows.length}>
            <DataTable
              columns={[
                { key: "pickup", label: "Pickup" },
                { key: "drop", label: "Drop" },
                { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
                { key: "assigned", label: "Assigned" }
              ]}
              rows={taskRows}
            />
          </DataState>
        </SectionCard>

        <SectionCard eyebrow="Updates" title="Latest notifications" description="The most recent activity updates relevant to your volunteer assignments.">
          <DataState isLoading={notifications.isLoading} error={notifications.error} empty={!notificationRows.length}>
            <DataTable
              columns={[
                { key: "title", label: "Title" },
                { key: "type", label: "Type", render: (row) => <StatusBadge value={row.type} /> },
                { key: "created", label: "Created" }
              ]}
              rows={notificationRows}
            />
          </DataState>
        </SectionCard>
      </div>
    </div>
  );
}
