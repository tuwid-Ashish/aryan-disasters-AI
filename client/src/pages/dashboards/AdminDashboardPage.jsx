import { MetricGrid } from "../../components/common/MetricGrid";
import { PageHero } from "../../components/common/PageHero";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { SectionCard } from "../../components/ui/SectionCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { InsightList } from "../../components/ui/InsightList";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { formatNumber, titleCase } from "../../lib/formatters";

export function AdminDashboardPage() {
  const overview = useAsyncData(async () => {
    const response = await api.get("/dashboard/overview");
    return response.data.data;
  }, []);

  const highPriority = useAsyncData(async () => {
    const response = await api.get("/dashboard/high-priority-requests?limit=6");
    return response.data.data;
  }, []);

  const metrics = [
    {
      label: "Active Disasters",
      value: formatNumber(overview.data?.activeDisasters),
      note: "Relief campaigns under active coordination.",
      badge: "Live"
    },
    {
      label: "Pending Requests",
      value: formatNumber(overview.data?.pendingRequests),
      note: "Demand waiting for approval or allocation.",
      badge: "Queue"
    },
    {
      label: "Available Resources",
      value: formatNumber(overview.data?.availableResources),
      note: "Verified inventory ready for matching.",
      badge: "Stock"
    },
    {
      label: "Delivered Allocations",
      value: formatNumber(overview.data?.deliveredAllocations),
      note: "Completed response outcomes across the network.",
      badge: "Done"
    }
  ];

  const insights = [
    {
      title: "Command oversight",
      body: "Administrators coordinate verification, allocation, and operational readiness across all active incidents."
    },
    {
      title: "Allocation urgency",
      body: "Priority-ranked requests provide a direct queue for resource matching and escalation decisions."
    },
    {
      title: "Network status",
      body: "This view consolidates disaster activity, resource readiness, and delivery completion into one command surface."
    }
  ];

  const priorityRows =
    highPriority.data?.map((item) => ({
      id: item._id,
      category: titleCase(item.category),
      urgency: item.urgencyLevel,
      affected: formatNumber(item.peopleAffected),
      score: item.priorityScore,
      status: item.status
    })) || [];

  return (
    <div className="page-stack">
      <PageHero
        title="Admin command dashboard"
        description="Monitor active incidents, triage high-priority demand, and manage the operational flow of verified disaster response."
      />
      <MetricGrid items={metrics} />

      <div className="dashboard-grid">
        <SectionCard
          eyebrow="Priority radar"
          title="Highest-priority verified requests"
          description="These cases should be reviewed first for approval, matching, and field dispatch."
        >
          <DataState isLoading={highPriority.isLoading} error={highPriority.error} empty={!priorityRows.length}>
            <DataTable
              columns={[
                { key: "category", label: "Category" },
                { key: "urgency", label: "Urgency", render: (row) => <StatusBadge value={row.urgency} /> },
                { key: "affected", label: "People" },
                { key: "score", label: "Score" },
                { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> }
              ]}
              rows={priorityRows}
            />
          </DataState>
        </SectionCard>

        <SectionCard
          eyebrow="Operations brief"
          title="Admin priorities"
          description="A concise snapshot of the most important coordination responsibilities for platform administrators."
        >
          <InsightList items={insights} />
        </SectionCard>
      </div>
    </div>
  );
}
