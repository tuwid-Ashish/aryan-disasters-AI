import { Link } from "react-router-dom";
import { PageHero } from "../../components/common/PageHero";
import { MarketingLayout } from "../../components/layout/MarketingLayout";
import { SectionCard } from "../../components/ui/SectionCard";
import { usePageMetadata } from "../../hooks/usePageMetadata";
import { MARKETING_ABOUT_CONTENT } from "../../lib/constants";

export function AboutPage() {
  const { mission, principles, credibilityPoints } = MARKETING_ABOUT_CONTENT;

  usePageMetadata({
    title: "About The Platform",
    description:
      "Learn how Disasters AI combines role-based workflows, explainable AI assistance, and scalable architecture for disaster response."
  });

  return (
    <MarketingLayout>
      <div className="gov-page gov-about">
        <PageHero
          title="Purpose-built coordination for accountable response"
          description={mission}
          actions={
            <div className="hero-actions">
              <Link className="primary-button" to="/pricing">
                View Procurement Options
              </Link>
              <Link className="ghost-button" to="/login">
                Open Workspace
              </Link>
            </div>
          }
        />

        <section className="gov-about-grid" aria-label="Platform principles">
          {principles.map((item) => (
            <SectionCard key={item.title} eyebrow="Principle" title={item.title} className="gov-about-card">
              <p className="section-card-copy">{item.description}</p>
            </SectionCard>
          ))}
        </section>

        <SectionCard
          eyebrow="Architecture Credibility"
          title="Designed for pilot delivery and future scale"
          description="The current architecture follows a modular client and service-oriented backend split that supports incremental expansion."
          className="gov-credibility-card"
        >
          <ul className="gov-list">
            {credibilityPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>

        <section className="gov-about-cta" aria-label="About call to action">
          <p>
            We help response teams move from disconnected updates to a governed operating model where every allocation decision has context.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/pricing">
              Request Program Brief
            </Link>
            <Link className="ghost-button" to="/register">
              Register Stakeholder
            </Link>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
