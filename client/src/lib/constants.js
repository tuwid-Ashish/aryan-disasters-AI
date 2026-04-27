export const ROLES = {
  ADMIN: "admin",
  DONOR: "donor",
  BENEFICIARY: "beneficiary",
  VOLUNTEER: "volunteer"
};

export const APP_NAME = import.meta.env.VITE_APP_NAME || "Disasters AI";

export const MARKETING_NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" }
];

export const MARKETING_HOME_CONTENT = {
  hero: {
    title: "Procurement-ready disaster coordination for public agencies",
    description:
      "Disasters AI unifies verified demand, available supply, and explainable AI prioritization in one command workflow built for accountability.",
    primaryCta: { label: "Book Procurement Demo", to: "/pricing" },
    secondaryCta: { label: "View Platform Approach", to: "/about" }
  },
  trustPillars: [
    "Role-based governance from intake to delivery",
    "Human approval on every allocation recommendation",
    "Audit-friendly status history across requests and resources"
  ],
  capabilities: [
    {
      title: "Event-scoped operations",
      description: "Create disaster scopes by region and severity so teams work from a single operational context."
    },
    {
      title: "Verified request and supply intake",
      description: "Beneficiary requests and donor resources move into allocation only after administrative verification."
    },
    {
      title: "Explainable priority reasoning",
      description: "Priority scoring factors urgency, population impact, category criticality, and disaster severity."
    },
    {
      title: "Allocation recommendation support",
      description: "Matching assistance ranks available stock by category fit, availability, and operational urgency."
    }
  ],
  workflow: [
    {
      title: "Create disaster command scope",
      detail: "Admin initiates operation with region, status, and severity to anchor every downstream decision."
    },
    {
      title: "Verify demand and inventory",
      detail: "Requests and donor resources are reviewed before being added to the active response queue."
    },
    {
      title: "Prioritize and suggest allocations",
      detail: "AI-assisted logic ranks requests and proposes best-fit resource mappings for review."
    },
    {
      title: "Approve, dispatch, and track",
      detail: "Approved matches are executed through volunteer task flow with status visibility for all stakeholders."
    }
  ],
  roleOutcomes: [
    {
      role: "Admin",
      outcome: "Approves high-impact actions with clear context and audit trace."
    },
    {
      role: "Beneficiary",
      outcome: "Submits requests and monitors transparent status progression."
    },
    {
      role: "Donor",
      outcome: "Publishes stock and tracks verification and distribution outcomes."
    },
    {
      role: "Volunteer",
      outcome: "Executes ground tasks with pickup-to-delivery tracking."
    }
  ],
  proofMetrics: [
    { label: "Core user roles", value: "4", note: "Admin, Beneficiary, Donor, Volunteer" },
    { label: "Operational modules", value: "9+", note: "Disasters, Requests, Resources, Allocation, Dashboard, more" },
    { label: "AI decision touchpoints", value: "2", note: "Priority scoring and response summarization" }
  ],
  procurement: {
    title: "Built for public-sector buying cycles",
    body: "Use this platform as a demonstrable command system during evaluations, pilots, and phased rollouts with compliance-first messaging.",
    cta: { label: "Open Pricing And Procurement", to: "/pricing" }
  }
};

export const MARKETING_PRICING_CONTENT = {
  subtitle: "Enterprise-first procurement",
  description:
    "Commercial structure is oriented around proposal-led buying, implementation support, and governed rollout models.",
  contactEmail: "procurement@disastersai.gov",
  tiers: [
    {
      name: "Pilot Evaluation",
      suitability: "For district and municipal readiness trials",
      price: "Indicative quote",
      highlights: [
        "Scoped disaster operation setup",
        "Role onboarding for admin and field teams",
        "Procurement and technical readiness workshop"
      ]
    },
    {
      name: "Regional Command",
      suitability: "For state and multi-zone operations",
      price: "Custom annual contract",
      highlights: [
        "Multi-incident management support",
        "Allocation oversight and reporting playbooks",
        "Operational training for agency stakeholders"
      ]
    },
    {
      name: "National Program",
      suitability: "For central agencies and long-term programs",
      price: "RFP / framework agreement",
      highlights: [
        "Program governance and phased rollout planning",
        "Security and integration scoping",
        "Priority support and implementation steering"
      ]
    }
  ],
  procurementSteps: [
    "Share your mission profile and operating regions",
    "Align success criteria, reporting, and governance needs",
    "Receive a tailored proposal with deployment phases"
  ]
};

export const MARKETING_ABOUT_CONTENT = {
  mission:
    "Disasters AI exists to help response teams route scarce resources with speed, fairness, and explainable governance during high-pressure events.",
  principles: [
    {
      title: "Human-controlled AI",
      description: "AI supports ranking and matching, while accountable officials approve final allocation actions."
    },
    {
      title: "Role clarity at every step",
      description: "Admins, beneficiaries, donors, and volunteers each have explicit responsibilities and visibility."
    },
    {
      title: "Architecture prepared for growth",
      description: "Modular client and server domains support expansion from pilot implementation to large programs."
    }
  ],
  credibilityPoints: [
    "Centralized workflow from event creation to fulfillment",
    "Service-layer backend modules for maintainable domain logic",
    "Operational traceability suitable for formal reviews"
  ]
};

