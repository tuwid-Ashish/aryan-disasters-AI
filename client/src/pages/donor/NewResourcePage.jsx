import { PageHero } from "../../components/common/PageHero";
import { SectionCard } from "../../components/ui/SectionCard";
import { FormField } from "../../components/ui/FormField";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useState } from "react";
import { api } from "../../lib/api";

export function NewResourcePage() {
  const disasters = useAsyncData(async () => {
    const response = await api.get("/disasters");
    return response.data.data.filter((item) => item.status !== "closed");
  }, []);
  const [form, setForm] = useState({
    disasterId: "",
    category: "food",
    quantityAvailable: 10,
    unit: "packs",
    expiryDate: "",
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
      await api.post("/resources", form);
      setMessage("Resource submitted successfully.");
      setMessageState("success");
      setForm((current) => ({
        ...current,
        disasterId: "",
        category: "food",
        quantityAvailable: 10,
        unit: "packs",
        expiryDate: "",
        location: { address: "", city: "", state: "" }
      }));
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to submit resource.");
      setMessageState("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-stack">
      <PageHero title="Add resource" description="Submit available inventory with enough detail for admin verification and future allocation matching." />
      <SectionCard eyebrow="Donor form" title="Add inventory" description="Donor resources stay pending until admin verification.">
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
          <FormField label="Quantity available">
            <input type="number" min="1" value={form.quantityAvailable} onChange={(event) => setForm((current) => ({ ...current, quantityAvailable: Number(event.target.value) }))} />
          </FormField>
          <FormField label="Unit">
            <input value={form.unit} onChange={(event) => setForm((current) => ({ ...current, unit: event.target.value }))} placeholder="packs / bottles / kits" />
          </FormField>
          <FormField label="Expiry date">
            <input type="date" value={form.expiryDate} onChange={(event) => setForm((current) => ({ ...current, expiryDate: event.target.value }))} />
          </FormField>
          <FormField label="Address">
            <input value={form.location.address} onChange={(event) => setForm((current) => ({ ...current, location: { ...current.location, address: event.target.value } }))} placeholder="Warehouse / pickup point" />
          </FormField>
          <FormField label="City">
            <input value={form.location.city} onChange={(event) => setForm((current) => ({ ...current, location: { ...current.location, city: event.target.value } }))} placeholder="City" />
          </FormField>
          <FormField label="State">
            <input value={form.location.state} onChange={(event) => setForm((current) => ({ ...current, location: { ...current.location, state: event.target.value } }))} placeholder="State" />
          </FormField>

          {message ? <p className={`form-message ${messageState === "success" ? "is-success" : "is-error"}`}>{message}</p> : null}

          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit resource"}
          </button>
        </form>
      </SectionCard>
    </div>
  );
}
