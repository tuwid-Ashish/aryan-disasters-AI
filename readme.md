 # Disaster Management SaaS

AI-assisted disaster response platform for college-level demonstration and prototyping.

## AI Layer

The server uses a simple fallback chain for AI features:

1. Gemini API when `LLM_PROVIDER=gemini` or `GEMINI_API_KEY` is available.
2. Groq API when `LLM_PROVIDER=groq` or `GROQ_API_KEY` is available.
3. Local deterministic fallback when no key is configured.

Supported AI endpoints:

- `POST /api/ai/explain-priority`
- `POST /api/ai/disaster-summary`
- `POST /api/ai/match-resources`

## Server setup

Set the following environment variables:

- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `GEMINI_API_KEY` or `GROQ_API_KEY`
- optional `LLM_PROVIDER` (`gemini` or `groq`)

## Demo flow

1. Start the server and client.
2. Create a disaster event.
3. Add verified requests and verified donor resources.
4. Open the admin analytics page to view the AI disaster summary.
5. Open the admin requests page and click `Explain AI` on any request.
6. Open the admin allocations page to review AI match suggestions.
7. Approve the suggested allocation manually to keep the workflow human-reviewed.

## Test

Run the server tests with:

```bash
cd server
npm test
```

## Student Testing Guide

See the detailed student testing guide for setup and step-by-step instructions: [docs/student-testing-guide.md](docs/student-testing-guide.md)

