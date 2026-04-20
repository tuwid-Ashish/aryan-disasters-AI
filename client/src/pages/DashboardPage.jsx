import { useAuth } from "../app/providers";
import { AdminDashboardPage } from "./dashboards/AdminDashboardPage";
import { BeneficiaryDashboardPage } from "./dashboards/BeneficiaryDashboardPage";
import { DonorDashboardPage } from "./dashboards/DonorDashboardPage";
import { VolunteerDashboardPage } from "./dashboards/VolunteerDashboardPage";

export function DashboardPage() {
  const { user } = useAuth();

  switch (user?.role) {
    case "admin":
      return <AdminDashboardPage />;
    case "beneficiary":
      return <BeneficiaryDashboardPage />;
    case "donor":
      return <DonorDashboardPage />;
    case "volunteer":
      return <VolunteerDashboardPage />;
    default:
      return <BeneficiaryDashboardPage />;
  }
}
