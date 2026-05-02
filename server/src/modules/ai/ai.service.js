import llmClient from "./llm.client.js";
import { calculatePriorityScore } from "../../utils/priority-score.js";

export async function explainPriority(request) {
  const score = calculatePriorityScore(request, request.disasterSeverity || "medium");

  const base = {
    summary: `This ${request.category} request is prioritized because urgency is ${request.urgencyLevel} and ${request.peopleAffected || 1} people are affected.`,
    score,
    source: "local-fallback"
  };

  try {
    const prompt = `You are an assistant that explains priority decisions for disaster relief. Given the following request as JSON:\n${JSON.stringify(
      request
    )}\nPriority score: ${score}. Provide a concise (1-2 sentence) explanation why this request should be prioritized, using plain language suitable for government reviewers.`;

    const text = await llmClient.generateText(prompt, { maxTokens: 180 });

    if (text) return { summary: text.trim(), score, source: "llm" };
  } catch (err) {
    console.warn("LLM explainPriority error:", err?.message || err);
  }

  return base;
}

export async function generateDisasterSummary(payload) {
  const base = {
    summary: `Active disaster "${payload.title}" in ${payload.region} requires monitored coordination for requests, resource availability, and allocation.`,
    source: "local-fallback"
  };

  try {
    const prompt = `You are an assistant that generates short operational summaries for disaster response. Given the disaster payload as JSON:\n${JSON.stringify(
      payload
    )}\nProvide a 2-3 sentence summary emphasizing operational priorities, verification steps, and any immediate actions admins should consider.`;

    const text = await llmClient.generateText(prompt, { maxTokens: 240 });
    if (text) return { summary: text.trim(), source: "llm" };
  } catch (err) {
    console.warn("LLM generateDisasterSummary error:", err?.message || err);
  }

  return base;
}

/**
 * Suggest resource matches for requests.
 * - Performs deterministic filtering (category match, verified, quantity)
 * - Ranks candidates by quantity closeness and returns simple reasons
 * - Optionally asks LLM to provide human-friendly rationale for matches
 */
export async function suggestMatches(requests = [], resources = [], options = {}) {
  const suggestions = [];

  for (let i = 0; i < requests.length; i++) {
    const req = requests[i];
    const need = Number(req.quantityNeeded || req.quantity || 1);

    const candidates = resources
      .filter((r) => (r.category || r.type) === (req.category || req.type))
      .filter((r) => r.verificationStatus === "verified" || r.verified === true)
      .filter((r) => Number(r.quantityAvailable ?? r.quantity ?? 0) >= need);

    let chosen = null;
    if (candidates.length) {
      // pick candidate with smallest sufficient quantity to avoid over-allocating
      candidates.sort((a, b) => Number(a.quantityAvailable || a.quantity || 0) - Number(b.quantityAvailable || b.quantity || 0));
      chosen = candidates[0];
    }

    const score = calculatePriorityScore(req, options.disasterSeverity || req.disasterSeverity || "medium");

    suggestions.push({
      requestId: req.id || req._id || `req-${i}`,
      category: req.category || req.type || "unknown",
      resourceId: chosen ? chosen.id || chosen._id || null : null,
      resourceQtyAvailable: chosen ? Number(chosen.quantityAvailable ?? chosen.quantity ?? 0) : 0,
      requestQtyNeeded: need,
      matchScore: chosen ? Math.round(score + (need / Math.max(1, chosen.quantityAvailable || chosen.quantity || need)) * 10) : 0,
      reason: chosen ? "Category match and sufficient verified quantity" : "No verified resource matches found"
    });
  }

  // Ask LLM for short rationales for the suggested pairs
  try {
    const prompt = `You are an assistant that provides brief rationales for suggested resource allocations. Given these suggestions (JSON):\n${JSON.stringify(
      suggestions
    )}\nFor each suggestion, return a one-sentence rationale explaining why the resource was chosen or why no match exists.`;

    const rationaleText = await llmClient.generateText(prompt, { maxTokens: 400 });
    if (rationaleText) {
      return { suggestions, rationale: rationaleText.trim(), source: "llm" };
    }
  } catch (err) {
    console.warn("LLM suggestMatches error:", err?.message || err);
  }

  // fallback: return deterministic suggestions with simple concatenated reasons
  const fallbackRationale = suggestions.map((s) => `${s.requestId}: ${s.reason}`).join("; ");
  return { suggestions, rationale: fallbackRationale, source: "local-fallback" };
}

