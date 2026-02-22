import { HttpClient } from "../client";

export class Financial {
  constructor(private http: HttpClient) {}

  /** Search SEC EDGAR companies */
  async searchSEC(query: string) {
    return this.http.get("/v1/financial/sec/search", { q: query });
  }

  /** Get SEC filings for a company by CIK */
  async getFilings(cik: string, formType?: string) {
    const p: Record<string, string> = {};
    if (formType) p.form = formType;
    return this.http.get(`/v1/financial/sec/filings/${encodeURIComponent(cik)}`, p);
  }

  /** Search FDIC-insured institutions */
  async searchFDIC(params: { search?: string; state?: string; city?: string; active?: boolean; limit?: number; offset?: number }) {
    return this.http.post("/v1/financial/fdic/search", params);
  }

  /** Look up an FDIC institution by certificate number */
  async lookupFDIC(certNumber: string) {
    return this.http.get(`/v1/financial/fdic/institution/${encodeURIComponent(certNumber)}`);
  }

  /** Search FINRA-registered brokers */
  async searchBrokers(params: { name?: string; crdNumber?: string; firmName?: string; state?: string; limit?: number }) {
    return this.http.post("/v1/financial/finra/brokers", params);
  }

  /** Search FINRA-registered firms */
  async searchFirms(params: { name?: string; crdNumber?: string; state?: string; limit?: number }) {
    return this.http.post("/v1/financial/finra/firms", params);
  }
}
