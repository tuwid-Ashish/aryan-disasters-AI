import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { formatDate, formatNumber, titleCase } from "../../lib/formatters";

export function BeneficiaryRequestsPage() {
  const requests = useAsyncData(async () => {
    const response = await api.get("/requests");
    return response.data.data;
  }, []);

  const rows =
    requests.data?.map((item) => ({
      id: item._id,
      category: titleCase(item.category),
      quantity: formatNumber(item.quantityNeeded),
      urgency: item.urgencyLevel,
      verification: item.verificationStatus,
      status: item.status,
      score: item.priorityScore,
      created: formatDate(item.createdAt)
    })) || [];

  return (
    <div className="page-stack">
      <PageHero title="My requests" description="Track submitted relief requests, verification state, and allocation progress from one place." />
      <SectionCard eyebrow="Request history" title="Submitted demand" description="Beneficiary scope is automatically filtered by the backend using the current logged-in user.">
        <DataState isLoading={requests.isLoading} error={requests.error} empty={!rows.length}>
          <DataTable
            columns={[
              { key: "category", label: "Category" },
              { key: "quantity", label: "Quantity" },
              { key: "urgency", label: "Urgency", render: (row) => <StatusBadge value={row.urgency} /> },
              { key: "verification", label: "Verification", render: (row) => <StatusBadge value={row.verification} /> },
              { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
              { key: "score", label: "Priority" },
              { key: "created", label: "Created" }
            ]}
            rows={rows}
          />
        </DataState>
      </SectionCard>
    </div>
  );
}
