import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { env } from "../../config/env.js";

async function callGemini(prompt, options = {}) {
  const apiKey = env.geminiApiKey || env.llmApiKey;
  if (!apiKey) return null;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = options.model || env.geminiModel || "gemini-2.0-flash";
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: options.maxTokens || 256,
        temperature: options.temperature ?? 0.2
      }
    });

    const response = result.response;
    const text = typeof response?.text === "function" ? response.text() : "";
    return text || null;
  } catch (err) {
    console.warn("Gemini call failed:", err?.message || err);
    return null;
  }
}

async function callGroq(prompt, options = {}) {
  const apiKey = env.groqApiKey || env.llmApiKey;
  if (!apiKey) return null;

  try {
    const groq = new Groq({ apiKey });
    const modelName = options.model || env.groqModel || "llama-3.3-70b-versatile";
    const message = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: modelName,
      max_tokens: options.maxTokens || 256,
      temperature: options.temperature ?? 0.2
    });

    const text = message.choices?.[0]?.message?.content || "";
    console.log("Groq response from api :", text);
    return text || null;
  } catch (err) {
    console.warn("Groq call failed:", err?.message || err);
    return null;
  }
}

/**
 * Generate text using configured LLM provider.
 * Tries provider preference then falls back to available keys.
 */
export async function generateText(prompt, options = {}) {
  const provider = env.llmProvider?.toLowerCase();

  if (provider === "gemini" && (env.geminiApiKey || env.llmApiKey)) {
    const out = await callGemini(prompt, options);
    if (out) return out;
  }

  if (provider === "groq" && env.groqApiKey) {
    const out = await callGroq(prompt, options);
    if (out) return out;
  }

  // If provider not specified or preferred call failed, try any available key.
  if (env.geminiApiKey || env.llmApiKey) {
    const out = await callGemini(prompt, options);
    if (out) return out;
  }

  if (env.groqApiKey) {
    const out = await callGroq(prompt, options);
    if (out) return out;
  }

  return null;
}

export default { generateText };
