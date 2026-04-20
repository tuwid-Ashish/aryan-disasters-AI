import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../app/providers";
import { titleCase } from "../../lib/formatters";

const navByRole = {
  admin: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Disasters", to: "/admin/disasters" },
    { label: "Requests", to: "/admin/requests" },
    { label: "Resources", to: "/admin/resources" },
    { label: "Allocations", to: "/admin/allocations" },
    { label: "Analytics", to: "/admin/analytics" }
  ],
  beneficiary: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "My Requests", to: "/beneficiary/requests" },
    { label: "New Request", to: "/beneficiary/requests/new" }
  ],
  donor: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "My Resources", to: "/donor/resources" },
    { label: "Add Resource", to: "/donor/resources/new" }
  ],
  volunteer: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Tasks", to: "/volunteer/tasks" }
  ]
};

export function AppShell() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navItems = navByRole[user?.role] || [];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className={`app-shell ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <button
        type="button"
        className={`mobile-nav-backdrop ${isSidebarOpen ? "visible" : ""}`}
        aria-label="Close navigation"
        aria-hidden={!isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside id="app-navigation" className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand-row">
            <div className="brand-mark">
              <span>AD</span>
            </div>
            <button
              type="button"
              className="mobile-close-button"
              aria-label="Close navigation"
              onClick={() => setIsSidebarOpen(false)}
            >
              Close
            </button>
          </div>
          <div>
            <p className="eyebrow is-sidebar">Relief Ops Grid</p>
            <h1>Aryan Disasters AI</h1>
            <p className="sidebar-copy">
              Centralized disaster management for live operations, verified logistics, and AI-driven response planning.
            </p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/notifications" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Notifications
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Profile
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-slab">
            <strong>{user?.name}</strong>
            <span>{titleCase(user?.role || "guest")}</span>
          </div>
          <button type="button" className="ghost-button full-width" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="content-area">
        <header className="mobile-topbar">
          <button
            type="button"
            className="ghost-button mobile-nav-button"
            aria-expanded={isSidebarOpen}
            aria-controls="app-navigation"
            onClick={() => setIsSidebarOpen((current) => !current)}
          >
            Menu
          </button>
          <div className="mobile-topbar-copy">
            <p className="eyebrow">Command Center</p>
            <strong>{titleCase(user?.role || "guest")} workspace</strong>
          </div>
        </header>

        <header className="content-header">
          <div>
            <p className="eyebrow">Command Center</p>
            <h2>{titleCase(user?.role || "guest")} workspace</h2>
          </div>
          <div className="header-pill">Operational readiness</div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
