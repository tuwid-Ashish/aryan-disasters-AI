import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="marketing-page">
      <section className="hero-card hero-card-wide">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Operational Intelligence Platform</p>
            <h1>Production-ready disaster management software that centralizes response, logistics, and AI-led decisions.</h1>
            <p>
              Coordinate active incidents, validate requests, manage donor inventory, and turn live field data into
              faster allocation decisions through a unified command interface.
            </p>
            <div className="hero-actions">
              <Link className="primary-button" to="/login">
                Launch Workspace
              </Link>
              <Link className="ghost-button" to="/register">
                Create Account
              </Link>
            </div>
          </div>
          <div className="hero-dashboard-preview">
            <div className="preview-card">
              <span>Critical Requests</span>
              <strong>18</strong>
              <p>Verified cases waiting for allocation review.</p>
            </div>
            <div className="preview-card accent">
              <span>Resource Match Rate</span>
              <strong>73%</strong>
              <p>Rapid mapping between inventory and request category.</p>
            </div>
            <div className="preview-card dark">
              <span>Admin View</span>
              <strong>Live</strong>
              <p>Verification, prioritization, and response workflows in one dashboard.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
