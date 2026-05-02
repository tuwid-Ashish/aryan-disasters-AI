import { useAsyncData } from "./useAsyncData";
import { api } from "../lib/api";

function createAiRequestHook(path, payload, dependencies = []) {
  return useAsyncData(async () => {
    if (!payload) {
      return null;
    }

    const response = await api.post(path, payload);
    return response.data.data;
  }, dependencies);
}

export function useAiPriorityExplanation(requestPayload, dependencies = []) {
  return createAiRequestHook("/ai/explain-priority", requestPayload, dependencies);
}

export function useAiDisasterSummary(payload, dependencies = []) {
  return createAiRequestHook("/ai/disaster-summary", payload, dependencies);
}

export function useAiMatchSuggestions(payload, dependencies = []) {
  return createAiRequestHook("/ai/match-resources", payload, dependencies);
}
