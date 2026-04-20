import { Link } from "react-router-dom";

export function HomePage() {
  const workflow = [
    {
      title: "Incident created",
      detail: "Admin opens a disaster operation scope with region and severity context."
    },
    {
      title: "Demand and supply verified",
      detail: "Beneficiary requests and donor resources are validated before entering allocation flow."
    },
    {
      title: "Priority and matching",
      detail: "AI-assisted scoring and category matching rank what must be dispatched first."
    },
    {
      title: "Field execution",
      detail: "Volunteer task tracking closes the loop from approval to delivered response."
    }
  ];

  const roleCards = [
    {
      role: "Admin",
      focus: "Command and verification",
      description: "Controls disasters, validates records, and approves high-impact allocation decisions."
    },
    {
      role: "Beneficiary",
      focus: "Request and tracking",
      description: "Creates relief requests and receives transparent status updates from review to fulfillment."
    },
    {
      role: "Donor",
      focus: "Inventory contribution",
      description: "Publishes available stock and tracks readiness, verification, and eventual distribution."
    },
    {
      role: "Volunteer",
      focus: "Last-mile execution",
      description: "Follows assigned pickups and deliveries to complete response operations on ground."
    }
  ];

  const proofMetrics = [
    { label: "Unified roles", value: "4", note: "Admin, Beneficiary, Donor, Volunteer in one flow" },
    { label: "Core modules", value: "9+", note: "Auth, Disasters, Requests, Resources, Allocation, Dashboard, more" },
    { label: "AI touchpoints", value: "2", note: "Priority reasoning and disaster summary assistance" }
  ];

  return (
    <main className="marketing-page marketing-page-flow landing-home">
      <section className="landing-shell">
        <header className="landing-topline">
          <div>
            <p className="eyebrow">Disaster Response Command System</p>
            <h1>Disasters AI</h1>
          </div>
          <span className="landing-status">Live orchestration model</span>
        </header>

        <section className="landing-hero">
          <article className="landing-hero-copy">
            <h2>One operational surface for disaster requests, donor inventory, and AI-assisted allocation decisions.</h2>
            <p>
              Your product is strongest when positioned as a command workflow, not just a dashboard. This design tells
              that story clearly from first screen: verify demand, verify supply, prioritize impact, dispatch response.
            </p>
            <div className="hero-actions">
              <Link className="primary-button" to="/login">
                Launch Workspace
              </Link>
              <Link className="ghost-button" to="/register">
                Create Account
              </Link>
            </div>
          </article>

          <article className="landing-signal-card">
            <p className="landing-signal-label">Operational signal</p>
            <strong>Response Loop</strong>
            <ol>
              <li>Scope disaster</li>
              <li>Validate requests/resources</li>
              <li>Prioritize and suggest allocations</li>
              <li>Track volunteer execution</li>
            </ol>
            <p className="landing-signal-note">Built to demonstrate end-to-end coordination, not isolated forms.</p>
          </article>
        </section>

        <section className="landing-grid">
          <article className="landing-card landing-workflow-card">
            <div className="landing-card-head">
              <p className="eyebrow">How It Works</p>
              <h3>Disaster response pipeline</h3>
            </div>
            <div className="landing-workflow">
              {workflow.map((step, index) => (
                <article key={step.title} className="landing-workflow-step">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>

          <article className="landing-card landing-roles-card">
            <div className="landing-card-head">
              <p className="eyebrow">Role Design</p>
              <h3>Who does what</h3>
            </div>
            <div className="landing-roles-grid">
              {roleCards.map((item) => (
                <article key={item.role} className="landing-role">
                  <h4>{item.role}</h4>
                  <p className="landing-role-focus">{item.focus}</p>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="landing-card landing-proof-card">
            <div className="landing-card-head">
              <p className="eyebrow">Why This Product</p>
              <h3>Clear product narrative</h3>
            </div>
            <p className="landing-proof-copy">
              This platform combines governance, logistics, and AI-support into one explainable workflow. That makes it
              ideal for project demonstration, practical deployment, and future scale.
            </p>
            <div className="landing-metrics">
              {proofMetrics.map((metric) => (
                <div key={metric.label} className="landing-metric">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <p>{metric.note}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="landing-bottom-cta">
          <p>Ready to demonstrate complete disaster coordination from request intake to delivery?</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/login">
              Enter Command Center
            </Link>
            <Link className="ghost-button" to="/register">
              Register Team Member
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
