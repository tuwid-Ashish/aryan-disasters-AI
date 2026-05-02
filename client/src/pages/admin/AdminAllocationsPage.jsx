import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useAiMatchSuggestions } from "../../hooks/useAi";
import { api } from "../../lib/api";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { titleCase } from "../../lib/formatters";

export function AdminAllocationsPage() {
  const requests = useAsyncData(async () => {
    const response = await api.get("/requests");
    return response.data.data;
  }, []);

  const resources = useAsyncData(async () => {
    const response = await api.get("/resources");
    return response.data.data;
  }, []);

  const aiMatches = useAiMatchSuggestions(
    {
      requests:
        requests.data?.map((item) => ({
          id: item._id,
          category: item.category,
          quantityNeeded: item.quantityNeeded || item.quantity || 1,
          verificationStatus: item.verificationStatus,
          urgencyLevel: item.urgencyLevel,
          peopleAffected: item.peopleAffected,
          disasterSeverity: item.disasterSeverity || "medium"
        })) || [],
      resources:
        resources.data?.map((item) => ({
          id: item._id,
          category: item.category,
          quantityAvailable: item.quantityAvailable,
          verificationStatus: item.verificationStatus,
          verified: item.verificationStatus === "verified"
        })) || [],
      options: {
        disasterSeverity: "medium"
      }
    },
    [requests.data, resources.data]
  );

  const rows =
    aiMatches.data?.suggestions?.map((item) => ({
      id: item.requestId,
      request: titleCase(item.category || item.requestId),
      resource: item.resourceId ? "Matched resource available" : "No direct match",
      quantity: item.requestQtyNeeded || 0,
      reason: item.reason,
      score: item.matchScore || 0
    })) || [];

  return (
    <div className="page-stack">
      <PageHero title="Allocation center" description="AI-driven matching suggestions help administrators move verified supply to the highest-impact requests." />
      <SectionCard eyebrow="Suggestion engine" title="Recommended matches" description="This combines verified requests and resources with AI-assisted allocation reasoning.">
        <DataState isLoading={requests.isLoading || resources.isLoading || aiMatches.isLoading} error={requests.error || resources.error || aiMatches.error} empty={!rows.length}>
          {aiMatches.data?.rationale ? <p className="form-message">{aiMatches.data.rationale}</p> : null}
          <DataTable
            columns={[
              { key: "request", label: "Request" },
              { key: "resource", label: "Suggested resource" },
              { key: "quantity", label: "Assigned qty" },
              {
                key: "signal",
                label: "Match quality",
                render: (row) => <StatusBadge value={row.score > 30 ? "verified" : row.score > 0 ? "pending" : "critical"} />
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
