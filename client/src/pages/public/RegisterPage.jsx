import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { useAuth } from "../../app/providers";

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "beneficiary"
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await api.post("/auth/register", form);
      const { token, user } = response.data.data;
      login(token, user);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Registration failed. Check backend server and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Create account</p>
        <h1>Register a new user</h1>
        <label>
          Full name
          <input
            type="text"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Aryan Sharma"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="aryan@example.com"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="Minimum 6 characters"
          />
        </label>
        <label>
          Role
          <select value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}>
            <option value="beneficiary">Beneficiary</option>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
        <div className="auth-switch">
          <span>Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </form>
    </main>
  );
}
