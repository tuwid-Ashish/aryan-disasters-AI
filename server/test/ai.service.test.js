import assert from "node:assert/strict";
import test from "node:test";

process.env.MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ai-test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
process.env.CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
process.env.GEMINI_API_KEY = "";
process.env.GROQ_API_KEY = "";
process.env.LLM_API_KEY = "";
process.env.LLM_PROVIDER = "";

const { explainPriority, suggestMatches } = await import("../src/modules/ai/ai.service.js");
const { calculatePriorityScore } = await import("../src/utils/priority-score.js");

test("explainPriority falls back when no LLM key is configured", async () => {
  const request = {
    category: "medicine",
    urgencyLevel: "critical",
    peopleAffected: 5,
    disasterSeverity: "high"
  };

  const result = await explainPriority(request);

  assert.equal(result.source, "local-fallback");
  assert.equal(result.score, calculatePriorityScore(request, "high"));
  assert.match(result.summary, /medicine/i);
});

test("suggestMatches returns deterministic verified resource matches", async () => {
  const result = await suggestMatches(
    [
      {
        id: "req-1",
        category: "water",
        quantityNeeded: 10,
        verificationStatus: "verified",
        urgencyLevel: "high",
        peopleAffected: 24,
        disasterSeverity: "medium"
      }
    ],
    [
      {
        id: "res-1",
        category: "water",
        quantityAvailable: 50,
        verificationStatus: "verified"
      }
    ]
  );

  assert.equal(result.source, "local-fallback");
  assert.equal(result.suggestions[0].resourceId, "res-1");
  assert.equal(result.suggestions[0].category, "water");
  assert.match(result.rationale, /Category match/i);
});
