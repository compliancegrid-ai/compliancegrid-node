import { HttpClient } from "../client";

export class Pharma {
  constructor(private http: HttpClient) {}

  /** Look up a DEA registration by number */
  async lookupDEA(deaNumber: string) {
    return this.http.get(`/v1/pharma/dea/lookup/${encodeURIComponent(deaNumber)}`);
  }

  /** Search DEA registrations */
  async searchDEA(params: { name?: string; state?: string; businessActivity?: string; limit?: number; offset?: number }) {
    return this.http.post("/v1/pharma/dea/search", params);
  }

  /** Validate a DEA number checksum */
  async validateDEA(deaNumber: string) {
    return this.http.get(`/v1/pharma/dea/validate/${encodeURIComponent(deaNumber)}`);
  }

  /** Search FDA drug database */
  async searchDrugs(params: { search: string; limit?: number; offset?: number }) {
    return this.http.post("/v1/pharma/fda/drug/search", params);
  }

  /** Look up an NDC code */
  async lookupNDC(ndc: string) {
    return this.http.get(`/v1/pharma/fda/drug/ndc/${encodeURIComponent(ndc)}`);
  }

  /** Search FDA drug shortages */
  async searchShortages(params: { search: string; limit?: number }) {
    return this.http.post("/v1/pharma/fda/shortages", params);
  }

  /** Search FDA drug recalls */
  async searchRecalls(params: { search: string; classification?: string; limit?: number; offset?: number }) {
    return this.http.post("/v1/pharma/fda/recalls", params);
  }

  /** Get DEA schedule reference data */
  async deaSchedules() {
    return this.http.get("/v1/pharma/reference/dea-schedules");
  }

  /** Get DEA business activity codes */
  async businessActivities() {
    return this.http.get("/v1/pharma/reference/business-activities");
  }
}
