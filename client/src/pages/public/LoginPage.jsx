import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers";
import { api } from "../../lib/api";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await api.post("/auth/login", form);
      const { token, user } = response.data.data;
      login(token, user);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Login failed. Check backend server and credentials.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Secure Access</p>
        <h1>Sign in to the workspace</h1>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="admin@example.com"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="Enter password"
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
        <div className="auth-switch">
          <span>New here?</span>
          <Link to="/register">Create an account</Link>
        </div>
      </form>
    </main>
  );
}
