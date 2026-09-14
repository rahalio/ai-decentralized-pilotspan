/**
 * Postman-collection 1:1 Vitest tests for shadow-ai (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  limit: "",
  status: "",
  systemId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / shadow-ai (1:1 generated)", () => {

  it("listShadowAiSystems", async () => {
    const url = sub("{{baseUrl}}/v1/shadow-ai-systems?cursor={{cursor}}&limit={{limit}}&status={{status}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createShadowAiSystem", async () => {
    const url = sub("{{baseUrl}}/v1/shadow-ai-systems");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"name\": \"Newman Test\",\n  \"department\": \"\",\n  \"ownerPersonId\": \"newman_ownerPersonId\",\n  \"riskNotes\": \"\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['shadowAiSystemId'] = j.data.id;
  });

  it("getShadowAiSystem", async () => {
    const url = sub("{{baseUrl}}/v1/shadow-ai-systems/{{systemId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("remediateShadowAiSystem", async () => {
    const url = sub("{{baseUrl}}/v1/shadow-ai-systems/{{systemId}}/remediation");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"action\": \"claim\",\n  \"ownerPersonId\": \"newman_ownerPersonId\",\n  \"linkedPilotId\": \"newman_linkedPilotId\",\n  \"notes\": \"\"\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
