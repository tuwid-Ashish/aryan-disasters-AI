import { Link } from "react-router-dom";
import { PageHero } from "../../components/common/PageHero";
import { MarketingLayout } from "../../components/layout/MarketingLayout";
import { SectionCard } from "../../components/ui/SectionCard";
import { usePageMetadata } from "../../hooks/usePageMetadata";
import { MARKETING_PRICING_CONTENT } from "../../lib/constants";

export function PricingPage() {
  const { subtitle, description, contactEmail, tiers, procurementSteps } = MARKETING_PRICING_CONTENT;

  usePageMetadata({
    title: "Pricing And Procurement",
    description:
      "Enterprise-first pricing for government and response agencies, including proposal-led scoping and RFP alignment."
  });

  return (
    <MarketingLayout>
      <div className="gov-page gov-pricing">
        <PageHero
          title={subtitle}
          description={description}
          actions={
            <div className="hero-actions">
              <a className="primary-button" href={`mailto:${contactEmail}`}>
                Contact Sales
              </a>
              <Link className="ghost-button" to="/register">
                Start Team Access
              </Link>
            </div>
          }
        />

        <section className="gov-pricing-grid" aria-label="Pricing tiers">
          {tiers.map((tier) => (
            <SectionCard
              key={tier.name}
              eyebrow="Indicative Package"
              title={tier.name}
              description={tier.suitability}
              className="gov-pricing-card"
            >
              <p className="gov-pricing-price">{tier.price}</p>
              <ul className="gov-list">
                {tier.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SectionCard>
          ))}
        </section>

        <SectionCard
          eyebrow="Procurement Process"
          title="How to engage with our commercial team"
          description="We align deployment and governance details before submitting proposal-ready terms."
          className="gov-procurement-card"
          action={
            <a className="mini-button" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          }
        >
          <ol className="gov-list gov-list-ordered">
            {procurementSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </SectionCard>

        <section className="gov-pricing-cta" aria-label="Pricing footer call to action">
          <p>Need a formal proposal package? We can shape scope, governance, and rollout phases around your program constraints.</p>
          <div className="hero-actions">
            <a className="primary-button" href={`mailto:${contactEmail}`}>
              Request Proposal Draft
            </a>
            <Link className="ghost-button" to="/about">
              Review Platform Background
            </Link>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
