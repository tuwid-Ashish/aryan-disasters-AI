export async function explainPriority(request) {
  return {
    summary: `This ${request.category} request is prioritized because urgency is ${request.urgencyLevel} and ${request.peopleAffected || 1} people are affected.`,
    source: "local-fallback"
  };
}

export async function generateDisasterSummary(payload) {
  return {
    summary: `Active disaster "${payload.title}" in ${payload.region} requires monitored coordination for requests, resource availability, and allocation.`,
    source: "local-fallback"
  };
}

