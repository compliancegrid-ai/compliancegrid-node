import { HttpClient } from "../client";

export class HSCodes {
  constructor(private http: HttpClient) {}

  /** Search HTS codes by keyword */
  async search(query: string, params?: { limit?: number }) {
    const p: Record<string, string> = { query };
    if (params?.limit) p.limit = String(params.limit);
    return this.http.get("/v1/hs/search", p);
  }

  /** AI-powered HS classification */
  async classify(params: { description: string; destinationCountry?: string }) {
    return this.http.post("/v1/hs/classify", params);
  }

  /** Look up a specific HTS number */
  async lookup(htsNumber: string) {
    return this.http.get(`/v1/hs/lookup/${encodeURIComponent(htsNumber)}`);
  }

  /** Get HTS sections overview */
  async sections() {
    return this.http.get("/v1/hs/reference/sections");
  }

  /** Get General Rules of Interpretation */
  async gri() {
    return this.http.get("/v1/hs/reference/gri");
  }

  /** Get cache statistics */
  async cacheStats() {
    return this.http.get("/v1/hs/cache-stats");
  }
}
