import { Link } from "react-router-dom";
import { MetricGrid } from "../../components/common/MetricGrid";
import { MarketingLayout } from "../../components/layout/MarketingLayout";
import { SectionCard } from "../../components/ui/SectionCard";
import { usePageMetadata } from "../../hooks/usePageMetadata";
import { MARKETING_HOME_CONTENT } from "../../lib/constants";

export function HomePage() {
  const { hero, trustPillars, capabilities, workflow, roleOutcomes, proofMetrics, procurement } = MARKETING_HOME_CONTENT;

  usePageMetadata({
    title: "Government Disaster Coordination",
    description:
      "Disasters AI helps agencies verify demand and supply, apply explainable AI prioritization, and track response execution end to end."
  });

  return (
    <MarketingLayout>
      <div className="gov-page gov-home">
        <section className="gov-hero" aria-label="Platform overview">
          <article className="gov-hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <p className="gov-hero-tagline">{hero.tagline}</p>
            <h1>{hero.title}</h1>
            <p className="gov-hero-description">{hero.description}</p>

            <ul className="gov-hero-highlights" aria-label="Hero highlights">
              {hero.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="hero-actions">
              <Link className="primary-button" to={hero.primaryCta.to}>
                {hero.primaryCta.label}
              </Link>
              <Link className="ghost-button" to={hero.secondaryCta.to}>
                {hero.secondaryCta.label}
              </Link>
            </div>
          </article>

          <article className="gov-hero-visual" aria-label="Response flow visual">
            <p className="gov-hero-visual-label">Live coordination signal</p>
            <h3>Incident to delivery command loop</h3>

            <ol className="gov-hero-sequence">
              {workflow.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                </li>
              ))}
            </ol>

            <div className="gov-hero-metrics" aria-label="Proof metrics">
              {proofMetrics.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="gov-trust-strip" aria-label="Trust pillars">
          {trustPillars.map((item) => (
            <article key={item} className="gov-trust-item">
              <p>{item}</p>
            </article>
          ))}
        </section>

        <section className="gov-feature-grid" aria-label="Capability highlights">
          {capabilities.map((item) => (
            <SectionCard key={item.title} eyebrow="Capability" title={item.title} className="gov-feature-card">
              <p className="section-card-copy">{item.description}</p>
            </SectionCard>
          ))}
        </section>

        <section className="gov-two-col" aria-label="Workflow and role outcomes">
          <SectionCard
            eyebrow="Workflow"
            title="How response moves from intake to delivery"
            description="A single, governed sequence keeps every role aligned during high-pressure events."
            className="gov-workflow-card"
          >
            <ol className="gov-workflow-list">
              {workflow.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionCard>

          <SectionCard
            eyebrow="Role Outcomes"
            title="Clear responsibilities for each stakeholder"
            description="From strategic control to field delivery, every role has explicit scope and visibility."
            className="gov-role-card"
          >
            <div className="gov-role-grid">
              {roleOutcomes.map((item) => (
                <article key={item.role} className="gov-role-item">
                  <h4>{item.role}</h4>
                  <p>{item.outcome}</p>
                </article>
              ))}
            </div>
          </SectionCard>
        </section>

        <SectionCard
          eyebrow="Proof"
          title="Explainable governance with measurable coverage"
          description="Your procurement narrative is strongest when structure, controls, and outcomes are visible at a glance."
          className="gov-proof-card"
        >
          <MetricGrid items={proofMetrics} />
        </SectionCard>

        <section className="gov-procurement-cta" aria-label="Procurement call to action">
          <div>
            <p className="eyebrow">Procurement Path</p>
            <h3>{procurement.title}</h3>
            <p>{procurement.body}</p>
          </div>
          <div className="hero-actions">
            <Link className="primary-button" to={procurement.cta.to}>
              {procurement.cta.label}
            </Link>
            <Link className="ghost-button" to="/login">
              Enter Workspace
            </Link>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
