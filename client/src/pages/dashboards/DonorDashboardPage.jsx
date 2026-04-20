import { MetricGrid } from "../../components/common/MetricGrid";
import { PageHero } from "../../components/common/PageHero";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { SectionCard } from "../../components/ui/SectionCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { formatDate, formatNumber, titleCase } from "../../lib/formatters";

export function DonorDashboardPage() {
  const resources = useAsyncData(async () => {
    const response = await api.get("/resources");
    return response.data.data;
  }, []);

  const notifications = useAsyncData(async () => {
    const response = await api.get("/notifications");
    return response.data.data;
  }, []);

  const resourceItems = resources.data || [];
  const notificationItems = notifications.data || [];

  const metrics = [
    {
      label: "My Listings",
      value: formatNumber(resourceItems.length),
      note: "Resource records submitted from this donor account.",
      badge: "Listed"
    },
    {
      label: "Verified Stock",
      value: formatNumber(resourceItems.filter((item) => item.verificationStatus === "verified").length),
      note: "Inventory approved for platform use.",
      badge: "Verified"
    },
    {
      label: "Available Stock",
      value: formatNumber(resourceItems.filter((item) => item.status === "available").length),
      note: "Listings currently ready for allocation.",
      badge: "Ready"
    },
    {
      label: "Pending Review",
      value: formatNumber(resourceItems.filter((item) => item.verificationStatus === "pending").length),
      note: "Stock entries awaiting admin review.",
      badge: "Review"
    }
  ];

  const resourceRows = resourceItems.slice(0, 5).map((item) => ({
    id: item._id,
    category: titleCase(item.category),
    quantity: `${formatNumber(item.quantityAvailable)} ${item.unit}`,
    verification: item.verificationStatus,
    status: item.status,
    expiry: formatDate(item.expiryDate)
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
        title="Donor dashboard"
        description="Manage submitted inventory, track verification progress, and monitor which resource listings are ready for disaster allocation."
      />
      <MetricGrid items={metrics} />

      <div className="dashboard-grid">
        <SectionCard eyebrow="Inventory status" title="Recent resource listings" description="Your latest stock submissions and their current readiness for matching.">
          <DataState isLoading={resources.isLoading} error={resources.error} empty={!resourceRows.length}>
            <DataTable
              columns={[
                { key: "category", label: "Category" },
                { key: "quantity", label: "Quantity" },
                { key: "verification", label: "Verification", render: (row) => <StatusBadge value={row.verification} /> },
                { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
                { key: "expiry", label: "Expiry" }
              ]}
              rows={resourceRows}
            />
          </DataState>
        </SectionCard>

        <SectionCard eyebrow="Updates" title="Latest notifications" description="Verification and availability updates delivered to your donor account.">
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
