import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { useAsyncData } from "../../hooks/useAsyncData";
import { api } from "../../lib/api";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { formatDate, formatNumber, titleCase } from "../../lib/formatters";
import { useState } from "react";

export function AdminResourcesPage() {
  const [pendingAction, setPendingAction] = useState("");
  const [actionError, setActionError] = useState("");
  const resources = useAsyncData(async () => {
    const response = await api.get("/resources");
    return response.data.data;
  }, []);

  async function updateVerification(id, verificationStatus) {
    const actionKey = `${id}:${verificationStatus}`;
    setPendingAction(actionKey);
    setActionError("");

    try {
      await api.patch(`/resources/${id}/verify`, {
        verificationStatus,
        verificationNote: verificationStatus === "verified" ? "Resource approved by admin." : "Resource rejected by admin."
      });
      resources.reload();
    } catch (error) {
      setActionError(error.response?.data?.message || "Failed to update resource verification.");
    } finally {
      setPendingAction("");
    }
  }

  async function updateStatus(id, status) {
    const actionKey = `${id}:${status}`;
    setPendingAction(actionKey);
    setActionError("");

    try {
      await api.patch(`/resources/${id}/status`, { status });
      resources.reload();
    } catch (error) {
      setActionError(error.response?.data?.message || "Failed to update resource status.");
    } finally {
      setPendingAction("");
    }
  }

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
      <PageHero title="Resource inventory" description="Review donor inventory, verify stock quality, and update availability before allocation." />
      <SectionCard eyebrow="Inventory review" title="Verified and pending stock" description="Admin actions here control which donor resources are allowed into the matching flow.">
        {actionError ? <p className="form-message is-error">{actionError}</p> : null}
        <DataState isLoading={resources.isLoading} error={resources.error} empty={!rows.length}>
          <DataTable
            columns={[
              { key: "category", label: "Category" },
              { key: "quantity", label: "Quantity" },
              { key: "verification", label: "Verification", render: (row) => <StatusBadge value={row.verification} /> },
              { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
              { key: "expiry", label: "Expiry" },
              { key: "created", label: "Created" },
              {
                key: "actions",
                label: "Actions",
                render: (row) => (
                  <div className="inline-actions">
                    <button
                      className="mini-button"
                      onClick={() => updateVerification(row.id, "verified")}
                      type="button"
                      disabled={pendingAction === `${row.id}:verified`}
                    >
                      Verify
                    </button>
                    <button
                      className="mini-button alt"
                      onClick={() => updateVerification(row.id, "rejected")}
                      type="button"
                      disabled={pendingAction === `${row.id}:rejected`}
                    >
                      Reject
                    </button>
                    <button
                      className="mini-button dark"
                      onClick={() => updateStatus(row.id, "available")}
                      type="button"
                      disabled={pendingAction === `${row.id}:available`}
                    >
                      Activate
                    </button>
                  </div>
                )
              }
            ]}
            rows={rows}
          />
        </DataState>
      </SectionCard>
    </div>
  );
}
