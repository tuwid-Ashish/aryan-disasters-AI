import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { titleCase } from "../../lib/formatters";

export function AdminAllocationsPage() {
  const suggestions = useAsyncData(async () => {
    const response = await api.post("/allocations/suggestions");
    return response.data.data;
  }, []);

  const rows =
    suggestions.data?.map((item) => ({
      id: item.requestId,
      request: titleCase(item.requestTitle),
      resource: item.suggestedResourceId ? "Matched resource available" : "No direct match",
      quantity: item.assignedQuantity || 0,
      reason: item.reason
    })) || [];

  return (
    <div className="page-stack">
      <PageHero title="Allocation center" description="AI-driven matching suggestions help administrators move verified supply to the highest-impact requests." />
      <SectionCard eyebrow="Suggestion engine" title="Recommended matches" description="This reads directly from the backend allocation suggestion endpoint.">
        <DataState isLoading={suggestions.isLoading} error={suggestions.error} empty={!rows.length}>
          <DataTable
            columns={[
              { key: "request", label: "Request" },
              { key: "resource", label: "Suggested resource" },
              { key: "quantity", label: "Assigned qty" },
              {
                key: "signal",
                label: "Match quality",
                render: (row) => <StatusBadge value={row.quantity > 0 ? "verified" : "pending"} />
              },
              { key: "reason", label: "Reason" }
            ]}
            rows={rows}
          />
        </DataState>
      </SectionCard>
    </div>
  );
}
