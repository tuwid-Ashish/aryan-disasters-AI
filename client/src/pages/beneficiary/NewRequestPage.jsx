import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { FormField } from "../../components/ui/FormField";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useState } from "react";
import { api } from "../../lib/api";

export function NewRequestPage() {
  const disasters = useAsyncData(async () => {
    const response = await api.get("/disasters");
    return response.data.data.filter((item) => item.status !== "closed");
  }, []);
  const [form, setForm] = useState({
    disasterId: "",
    category: "food",
    quantityNeeded: 1,
    urgencyLevel: "medium",
    peopleAffected: 1,
    description: "",
    subcategory: "",
    location: {
      address: "",
      city: "",
      state: ""
    }
  });
  const [message, setMessage] = useState("");
  const [messageState, setMessageState] = useState("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      await api.post("/requests", form);
      setMessage("Request submitted successfully.");
      setMessageState("success");
      setForm((current) => ({
        ...current,
        disasterId: "",
        category: "food",
        urgencyLevel: "medium",
        quantityNeeded: 1,
        peopleAffected: 1,
        description: "",
        subcategory: "",
        location: { address: "", city: "", state: "" }
      }));
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to submit request.");
      setMessageState("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-stack">
      <PageHero title="Create request" description="Submit relief demand with the exact operational fields needed for prioritization and allocation." />
      <SectionCard eyebrow="Relief form" title="Request help" description="The backend computes priority based on urgency, category, and people affected.">
        <form className="form-grid" onSubmit={handleSubmit}>
          <FormField label="Active disaster">
            <select value={form.disasterId} onChange={(event) => setForm((current) => ({ ...current, disasterId: event.target.value }))}>
              <option value="">Select disaster</option>
              {(disasters.data || []).map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Category">
            <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
              <option value="food">Food</option>
              <option value="water">Water</option>
              <option value="medicine">Medicine</option>
              <option value="shelter">Shelter</option>
              <option value="clothes">Clothes</option>
              <option value="rescue">Rescue</option>
            </select>
          </FormField>
          <FormField label="Subcategory">
            <input value={form.subcategory} onChange={(event) => setForm((current) => ({ ...current, subcategory: event.target.value }))} placeholder="Dry ration / First aid / Blanket" />
          </FormField>
          <FormField label="Urgency">
            <select value={form.urgencyLevel} onChange={(event) => setForm((current) => ({ ...current, urgencyLevel: event.target.value }))}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </FormField>
          <FormField label="Quantity needed">
            <input type="number" min="1" value={form.quantityNeeded} onChange={(event) => setForm((current) => ({ ...current, quantityNeeded: Number(event.target.value) }))} />
          </FormField>
          <FormField label="People affected">
            <input type="number" min="1" value={form.peopleAffected} onChange={(event) => setForm((current) => ({ ...current, peopleAffected: Number(event.target.value) }))} />
          </FormField>
          <FormField label="Address">
            <input value={form.location.address} onChange={(event) => setForm((current) => ({ ...current, location: { ...current.location, address: event.target.value } }))} placeholder="Street / shelter / locality" />
          </FormField>
          <FormField label="City">
            <input value={form.location.city} onChange={(event) => setForm((current) => ({ ...current, location: { ...current.location, city: event.target.value } }))} placeholder="City" />
          </FormField>
          <FormField label="State">
            <input value={form.location.state} onChange={(event) => setForm((current) => ({ ...current, location: { ...current.location, state: event.target.value } }))} placeholder="State" />
          </FormField>
          <FormField label="Description">
            <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} rows="4" placeholder="Describe the urgent requirement and current situation." />
          </FormField>

          {message ? <p className={`form-message ${messageState === "success" ? "is-success" : "is-error"}`}>{message}</p> : null}

          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit request"}
          </button>
        </form>
      </SectionCard>
    </div>
  );
}
