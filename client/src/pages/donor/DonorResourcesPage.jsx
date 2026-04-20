import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { formatDate, formatNumber, titleCase } from "../../lib/formatters";

export function DonorResourcesPage() {
  const resources = useAsyncData(async () => {
    const response = await api.get("/resources");
    return response.data.data;
  }, []);

  const rows =
    resources.data?.map((item) => ({
      id: item._id,
      category: titleCase(item.category),
      quantity: `${formatNumber(item.quantityAvailable)} ${item.unit}`,
      verification: item.verificationStatus,
      status: item.status,
      expiry: formatDate(item.expiryDate),
      created: formatDate(item.createdAt)
    })) || [];

  return (
    <div className="page-stack">
      <PageHero title="My resources" description="Manage donated stock with clear visibility into verification and availability state." />
      <SectionCard eyebrow="Donor inventory" title="Submitted resources" description="The backend automatically filters records to the current donor account.">
        <DataState isLoading={resources.isLoading} error={resources.error} empty={!rows.length}>
          <DataTable
            columns={[
              { key: "category", label: "Category" },
              { key: "quantity", label: "Quantity" },
              { key: "verification", label: "Verification", render: (row) => <StatusBadge value={row.verification} /> },
              { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
              { key: "expiry", label: "Expiry" },
              { key: "created", label: "Created" }
            ]}
            rows={rows}
          />
        </DataState>
      </SectionCard>
    </div>
  );
}
