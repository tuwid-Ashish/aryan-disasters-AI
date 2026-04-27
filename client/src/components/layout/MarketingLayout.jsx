import { Link, NavLink } from "react-router-dom";
import { APP_NAME, MARKETING_NAV_LINKS } from "../../lib/constants";

export function MarketingLayout({ children }) {
  const year = new Date().getFullYear();

  return (
    <div className="gov-site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="gov-header" role="banner">
        <div className="gov-header-brand">
          <p className="eyebrow">Public Sector Disaster Response Platform</p>
          <Link to="/" className="gov-brand-link">
            {APP_NAME}
          </Link>
        </div>

        <nav className="gov-nav" aria-label="Primary">
          {MARKETING_NAV_LINKS.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `gov-nav-link${isActive ? " is-active" : ""}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="gov-header-actions">
          <Link className="ghost-button" to="/login">
            Sign In
          </Link>
          <Link className="primary-button" to="/register">
            Start As Team
          </Link>
        </div>
      </header>

      <main id="main-content" className="gov-main" tabIndex="-1">
        {children}
      </main>

      <footer className="gov-footer">
        <p>{APP_NAME} helps agencies coordinate demand, supply, and delivery with explainable AI support.</p>
        <p>Copyright {year} {APP_NAME}. Built for accountable response operations.</p>
      </footer>
    </div>
  );
}
