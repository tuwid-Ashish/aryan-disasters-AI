import { useAuth } from "../app/providers";
import { PageHero } from "../components/common/PageHero";
import { SectionCard } from "../components/ui/SectionCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { titleCase } from "../lib/formatters";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="page-stack">
      <PageHero title="Profile" description="Authenticated session details currently resolved from the backend auth bootstrap." />
      <SectionCard eyebrow="Identity" title={user?.name} description={user?.email}>
        <div className="profile-grid">
          <div className="profile-item">
            <span>Role</span>
            <StatusBadge value={titleCase(user?.role || "guest")} />
          </div>
          <div className="profile-item">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>
          <div className="profile-item">
            <span>Session</span>
            <strong>Authenticated</strong>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
