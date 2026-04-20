import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { FormField } from "../../components/ui/FormField";
import { useState } from "react";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { formatDate, titleCase } from "../../lib/formatters";

export function AdminDisastersPage() {
  const [form, setForm] = useState({
    title: "",
    type: "",
    region: "",
    severity: "medium",
    status: "draft",
    description: "",
    impactSummary: ""
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitState, setSubmitState] = useState("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const disasters = useAsyncData(async () => {
    const response = await api.get("/disasters");
    return response.data.data;
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitMessage("");
    setIsSubmitting(true);

    try {
      await api.post("/disasters", form);
      setForm({
        title: "",
        type: "",
        region: "",
        severity: "medium",
        status: "draft",
        description: "",
        impactSummary: ""
      });
      setSubmitMessage("Disaster campaign created.");
      setSubmitState("success");
      disasters.reload();
    } catch (error) {
      setSubmitMessage(error.response?.data?.message || "Failed to create disaster.");
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const rows =
    disasters.data?.map((item) => ({
      id: item._id,
      title: item.title,
      type: titleCase(item.type),
      region: item.region,
      severity: item.severity,
      status: item.status,
      created: formatDate(item.createdAt)
    })) || [];

  return (
    <div className="page-stack">
      <PageHero title="Manage disasters" description="Create and monitor incident operations through a command-center workflow built for live disaster coordination." />

      <div className="split-layout">
        <SectionCard eyebrow="Create campaign" title="New disaster event" description="Create scoped incidents to group requests, resources, and response analytics.">
          <form className="form-grid" onSubmit={handleSubmit}>
            <FormField label="Title">
              <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Flood Relief Mumbai Zone A" />
            </FormField>
            <FormField label="Type">
              <input value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))} placeholder="Flood" />
            </FormField>
            <FormField label="Region">
              <input value={form.region} onChange={(event) => setForm((current) => ({ ...current, region: event.target.value }))} placeholder="Mumbai" />
            </FormField>
            <FormField label="Severity">
              <select value={form.severity} onChange={(event) => setForm((current) => ({ ...current, severity: event.target.value }))}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </FormField>
            <FormField label="Status">
              <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}>
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </FormField>
            <FormField label="Description">
              <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} rows="4" placeholder="Describe the incident and operational objective." />
            </FormField>
            <FormField label="Impact summary">
              <textarea value={form.impactSummary} onChange={(event) => setForm((current) => ({ ...current, impactSummary: event.target.value }))} rows="3" placeholder="Short operational summary for later analytics." />
            </FormField>

            {submitMessage ? (
              <p className={`form-message ${submitState === "success" ? "is-success" : "is-error"}`}>{submitMessage}</p>
            ) : null}

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create disaster"}
            </button>
          </form>
        </SectionCard>

        <SectionCard eyebrow="Registry" title="Existing campaigns" description="A live admin view backed by the disaster API.">
          <DataState isLoading={disasters.isLoading} error={disasters.error} empty={!rows.length}>
            <DataTable
              columns={[
                { key: "title", label: "Title" },
                { key: "type", label: "Type" },
                { key: "region", label: "Region" },
                { key: "severity", label: "Severity", render: (row) => <StatusBadge value={row.severity} /> },
                { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
                { key: "created", label: "Created" }
              ]}
              rows={rows}
            />
          </DataState>
        </SectionCard>
      </div>
    </div>
  );
}
