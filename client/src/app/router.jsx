import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./providers";
import { AppShell } from "../components/layout/AppShell";
import { HomePage } from "../pages/public/HomePage";
import { PricingPage } from "../pages/public/PricingPage";
import { AboutPage } from "../pages/public/AboutPage";
import { LoginPage } from "../pages/public/LoginPage";
import { RegisterPage } from "../pages/public/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ProfilePage } from "../pages/ProfilePage";
import { NotificationsPage } from "../pages/NotificationsPage";
import { AdminDisastersPage } from "../pages/admin/AdminDisastersPage";
import { AdminRequestsPage } from "../pages/admin/AdminRequestsPage";
import { AdminResourcesPage } from "../pages/admin/AdminResourcesPage";
import { AdminAllocationsPage } from "../pages/admin/AdminAllocationsPage";
import { AdminAnalyticsPage } from "../pages/admin/AdminAnalyticsPage";
import { BeneficiaryRequestsPage } from "../pages/beneficiary/BeneficiaryRequestsPage";
import { NewRequestPage } from "../pages/beneficiary/NewRequestPage";
import { DonorResourcesPage } from "../pages/donor/DonorResourcesPage";
import { NewResourcePage } from "../pages/donor/NewResourcePage";
import { VolunteerTasksPage } from "../pages/volunteer/VolunteerTasksPage";

function NotFoundRedirect() {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <main className="auth-page"><section className="auth-card"><h1>Loading workspace...</h1></section></main>;
  }

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
}

function ProtectedRoute() {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <main className="auth-page"><section className="auth-card"><h1>Loading workspace...</h1></section></main>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function RoleRoute({ roles }) {
  const { user } = useAuth();
  return roles.includes(user?.role) ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/pricing",
    element: <PricingPage />
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/notifications", element: <NotificationsPage /> },
          {
            element: <RoleRoute roles={["admin"]} />,
            children: [
              { path: "/admin/disasters", element: <AdminDisastersPage /> },
              { path: "/admin/requests", element: <AdminRequestsPage /> },
              { path: "/admin/resources", element: <AdminResourcesPage /> },
              { path: "/admin/allocations", element: <AdminAllocationsPage /> },
              { path: "/admin/analytics", element: <AdminAnalyticsPage /> }
            ]
          },
          {
            element: <RoleRoute roles={["beneficiary", "admin"]} />,
            children: [
              { path: "/beneficiary/requests", element: <BeneficiaryRequestsPage /> },
              { path: "/beneficiary/requests/new", element: <NewRequestPage /> }
            ]
          },
          {
            element: <RoleRoute roles={["donor", "admin"]} />,
            children: [
              { path: "/donor/resources", element: <DonorResourcesPage /> },
              { path: "/donor/resources/new", element: <NewResourcePage /> }
            ]
          },
          {
            element: <RoleRoute roles={["volunteer", "admin"]} />,
            children: [{ path: "/volunteer/tasks", element: <VolunteerTasksPage /> }]
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundRedirect />
  }
]);
