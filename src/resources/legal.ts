import { HttpClient } from "../client";

export class Legal {
  constructor(private http: HttpClient) {}

  /** Search OIG LEIE excluded individuals/entities */
  async searchOIG(params: {
    lastName?: string; firstName?: string; businessName?: string;
    npi?: string; state?: string; exclusionType?: string;
    limit?: number; offset?: number;
  }) {
    return this.http.post("/v1/legal/oig/search", params);
  }

  /** Quick NPI exclusion check */
  async checkNPI(npi: string) {
    return this.http.get(`/v1/legal/oig/check/${encodeURIComponent(npi)}`);
  }
}
