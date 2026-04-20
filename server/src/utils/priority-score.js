const urgencyWeights = {
  low: 10,
  medium: 20,
  high: 35,
  critical: 50
};

const categoryWeights = {
  food: 15,
  water: 20,
  medicine: 25,
  shelter: 18,
  clothes: 8,
  rescue: 30
};

const severityWeights = {
  low: 5,
  medium: 10,
  high: 20,
  critical: 30
};

export function calculatePriorityScore(request, disasterSeverity = "medium") {
  const urgency = urgencyWeights[request.urgencyLevel] ?? 0;
  const category = categoryWeights[request.category] ?? 0;
  const disaster = severityWeights[disasterSeverity] ?? 0;
  const affectedPeople = Math.min(Number(request.peopleAffected || 0), 100) * 0.4;
  const verificationBoost = request.verificationStatus === "verified" ? 8 : 0;

  return Math.round(urgency + category + disaster + affectedPeople + verificationBoost);
}

