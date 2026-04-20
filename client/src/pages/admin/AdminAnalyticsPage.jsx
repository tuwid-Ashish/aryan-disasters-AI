import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { MetricGrid } from "../../components/common/MetricGrid";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { DataState } from "../../components/ui/DataState";
import { InsightList } from "../../components/ui/InsightList";
import { formatNumber } from "../../lib/formatters";

export function AdminAnalyticsPage() {
  const overview = useAsyncData(async () => {
    const response = await api.get("/dashboard/overview");
    return response.data.data;
  }, []);
  const summary = useAsyncData(async () => {
    const response = await api.post("/ai/disaster-summary", {
      title: "Current response network",
      region: "Active regions"
    });
    return response.data.data;
  }, []);

  const metrics = [
    {
      label: "Active response events",
      value: formatNumber(overview.data?.activeDisasters),
      note: "Current campaigns with ongoing coordination.",
      badge: "Live"
    },
    {
      label: "Pending demand",
      value: formatNumber(overview.data?.pendingRequests),
      note: "Requests still waiting on final action.",
      badge: "Queue"
    },
    {
      label: "Supply availability",
      value: formatNumber(overview.data?.availableResources),
      note: "Inventory that can enter matching decisions.",
      badge: "Stock"
    }
  ];

  const insightItems = [
    {
      title: "AI summary",
      body: summary.data?.summary || "No summary generated yet."
    },
    {
      title: "Dashboard posture",
      body: "This analytics view combines operational metrics with AI interpretation to support planning, escalation, and executive review."
    }
  ];

  return (
    <div className="page-stack">
      <PageHero title="Analytics" description="An operational analytics layer that converts live backend metrics into actionable disaster response intelligence." />
      <MetricGrid items={metrics} />
      <SectionCard eyebrow="Analytical readout" title="System summary" description="This section combines backend metrics with AI-powered operational analysis.">
        <DataState isLoading={overview.isLoading || summary.isLoading} error={overview.error || summary.error} empty={false}>
          <InsightList items={insightItems} />
        </DataState>
      </SectionCard>
    </div>
  );
}
