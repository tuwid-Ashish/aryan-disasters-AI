import { MetricGrid } from "../../components/common/MetricGrid";
import { PageHero } from "../../components/common/PageHero";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { SectionCard } from "../../components/ui/SectionCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { formatDate, formatNumber, titleCase } from "../../lib/formatters";

export function BeneficiaryDashboardPage() {
  const requests = useAsyncData(async () => {
    const response = await api.get("/requests");
    return response.data.data;
  }, []);

  const notifications = useAsyncData(async () => {
    const response = await api.get("/notifications");
    return response.data.data;
  }, []);

  const requestItems = requests.data || [];
  const notificationItems = notifications.data || [];

  const metrics = [
    {
      label: "My Requests",
      value: formatNumber(requestItems.length),
      note: "Total relief requests submitted from this account.",
      badge: "Filed"
    },
    {
      label: "Verified Requests",
      value: formatNumber(requestItems.filter((item) => item.verificationStatus === "verified").length),
      note: "Requests approved through verification review.",
      badge: "Verified"
    },
    {
      label: "Pending Review",
      value: formatNumber(requestItems.filter((item) => item.verificationStatus === "pending").length),
      note: "Requests still waiting for verification.",
      badge: "Review"
    },
    {
      label: "Fulfilled Requests",
      value: formatNumber(requestItems.filter((item) => item.status === "fulfilled").length),
      note: "Requests completed through successful allocation.",
      badge: "Delivered"
    }
  ];

  const requestRows = requestItems.slice(0, 5).map((item) => ({
    id: item._id,
    category: titleCase(item.category),
    urgency: item.urgencyLevel,
    quantity: formatNumber(item.quantityNeeded),
    verification: item.verificationStatus,
    status: item.status
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
        title="Beneficiary dashboard"
        description="Track request verification, allocation progress, and recent updates related to the support your account has requested."
      />
      <MetricGrid items={metrics} />

      <div className="dashboard-grid">
        <SectionCard eyebrow="Request status" title="Recent requests" description="The latest requests submitted under your account and their current processing state.">
          <DataState isLoading={requests.isLoading} error={requests.error} empty={!requestRows.length}>
            <DataTable
              columns={[
                { key: "category", label: "Category" },
                { key: "urgency", label: "Urgency", render: (row) => <StatusBadge value={row.urgency} /> },
                { key: "quantity", label: "Quantity" },
                { key: "verification", label: "Verification", render: (row) => <StatusBadge value={row.verification} /> },
                { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> }
              ]}
              rows={requestRows}
            />
          </DataState>
        </SectionCard>

        <SectionCard eyebrow="Updates" title="Latest notifications" description="Verification changes and request progress messages delivered to your account.">
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
