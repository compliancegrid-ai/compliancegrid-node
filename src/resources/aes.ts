import { HttpClient } from "../client";

export class AES {
  constructor(private http: HttpClient) {}

  /** Validate an AES filing payload */
  async validate(payload: Record<string, unknown>) {
    return this.http.post("/v1/aes/validate", payload);
  }

  /** Prepare an AES filing payload for submission */
  async prepare(payload: Record<string, unknown>) {
    return this.http.post("/v1/aes/prepare", payload);
  }

  /** Determine if AES filing is required */
  async filingRequired(params: { destinationCountry: string; value: number; scheduleB?: string }) {
    return this.http.post("/v1/aes/filing-required", params);
  }

  /** Create a draft AES filing */
  async createFiling(payload: Record<string, unknown>) {
    return this.http.post("/v1/aes/filing", payload);
  }

  /** Get a filing by ID */
  async getFiling(id: string) {
    return this.http.get(`/v1/aes/filing/${encodeURIComponent(id)}`);
  }

  /** List all filings */
  async listFilings(params?: { status?: string; limit?: number; offset?: number }) {
    const p: Record<string, string> = {};
    if (params?.status) p.status = params.status;
    if (params?.limit) p.limit = String(params.limit);
    if (params?.offset) p.offset = String(params.offset);
    return this.http.get("/v1/aes/filings", p);
  }
}
