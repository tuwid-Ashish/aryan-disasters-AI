import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useAiPriorityExplanation } from "../../hooks/useAi";
import { api } from "../../lib/api";
import { DataState } from "../../components/ui/DataState";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { formatDate, formatNumber, titleCase } from "../../lib/formatters";
import { useState } from "react";

export function AdminRequestsPage() {
  const [pendingAction, setPendingAction] = useState("");
  const [actionError, setActionError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const requests = useAsyncData(async () => {
    const response = await api.get("/requests");
    return response.data.data;
  }, []);

  const explanation = useAiPriorityExplanation(
    selectedRequest
      ? {
          category: selectedRequest.category,
          urgencyLevel: selectedRequest.urgencyLevel,
          peopleAffected: selectedRequest.peopleAffected,
          disasterSeverity: selectedRequest.disasterSeverity || "medium",
          verificationStatus: selectedRequest.verificationStatus,
          status: selectedRequest.status
        }
      : null,
    [selectedRequest?._id]
  );

  async function updateVerification(id, verificationStatus) {
    const actionKey = `${id}:${verificationStatus}`;
    setPendingAction(actionKey);
    setActionError("");

    try {
      await api.patch(`/requests/${id}/verify`, {
        verificationStatus,
        verificationNote: verificationStatus === "verified" ? "Approved by admin." : "Marked rejected by admin."
      });
      requests.reload();
    } catch (error) {
      setActionError(error.response?.data?.message || "Failed to update verification.");
    } finally {
      setPendingAction("");
    }
  }

  async function updateStatus(id, status) {
    const actionKey = `${id}:${status}`;
    setPendingAction(actionKey);
    setActionError("");

    try {
      await api.patch(`/requests/${id}/status`, { status });
      requests.reload();
    } catch (error) {
      setActionError(error.response?.data?.message || "Failed to update request status.");
    } finally {
      setPendingAction("");
    }
  }

  const rows =
    requests.data?.map((item) => ({
      id: item._id,
      raw: item,
      category: titleCase(item.category),
      urgency: item.urgencyLevel,
      affected: formatNumber(item.peopleAffected),
      verification: item.verificationStatus,
      status: item.status,
      score: item.priorityScore,
      created: formatDate(item.createdAt)
    })) || [];

  return (
    <div className="page-stack">
      <PageHero title="Verify requests" description="Review demand, validate legitimacy, and move approved cases into the allocation pipeline." />
      <SectionCard eyebrow="Admin queue" title="Request review board" description="High-signal table with quick admin actions for verification and status updates.">
        {actionError ? <p className="form-message is-error">{actionError}</p> : null}
        <DataState isLoading={requests.isLoading} error={requests.error} empty={!rows.length}>
          <DataTable
            columns={[
              { key: "category", label: "Category" },
              { key: "urgency", label: "Urgency", render: (row) => <StatusBadge value={row.urgency} /> },
              { key: "affected", label: "People" },
              { key: "score", label: "Score" },
              { key: "verification", label: "Verification", render: (row) => <StatusBadge value={row.verification} /> },
              { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
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
                      onClick={() => updateStatus(row.id, "approved")}
                      type="button"
                      disabled={pendingAction === `${row.id}:approved`}
                    >
                      Approve
                    </button>
                    <button
                      className="mini-button"
                      onClick={() => setSelectedRequest(row.raw)}
                      type="button"
                    >
                      Explain AI
                    </button>
                  </div>
                )
              }
            ]}
            rows={rows}
          />
        </DataState>
      </SectionCard>

      {selectedRequest ? (
        <div className="ai-modal-backdrop" role="presentation" onClick={() => setSelectedRequest(null)}>
          <section
            className="ai-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="ai-modal-header">
              <div>
                <p className="eyebrow">AI explanation</p>
                <h3 id="ai-modal-title">Why this request is prioritized</h3>
              </div>
              <button className="mini-button dark" type="button" onClick={() => setSelectedRequest(null)}>
                Close
              </button>
            </header>

            <div className="ai-modal-meta">
              <StatusBadge value={selectedRequest.verificationStatus} />
              <StatusBadge value={selectedRequest.status} />
              <StatusBadge value={selectedRequest.urgencyLevel} />
            </div>

            <DataState isLoading={explanation.isLoading} error={explanation.error} empty={!explanation.data}>
              <p>{explanation.data?.summary}</p>
              {typeof explanation.data?.score === "number" ? (
                <p className="form-message">Priority score: {explanation.data.score}</p>
              ) : null}
            </DataState>
          </section>
        </div>
      ) : null}
    </div>
  );
}
