import { HttpClient } from "../client";

export class Aviation {
  constructor(private http: HttpClient) {}

  /** Search FAA aircraft registry */
  async searchAircraft(params: {
    nNumber?: string; registrantName?: string; manufacturer?: string;
    model?: string; state?: string; limit?: number; offset?: number;
  }) {
    return this.http.post("/v1/aviation/faa/aircraft/search", params);
  }

  /** Look up aircraft by N-Number */
  async lookupByNNumber(nNumber: string) {
    return this.http.get(`/v1/aviation/faa/aircraft/${encodeURIComponent(nNumber)}`);
  }

  /** Look up FMCSA carrier by DOT number */
  async lookupCarrier(dotNumber: string) {
    return this.http.get(`/v1/aviation/fmcsa/carrier/${encodeURIComponent(dotNumber)}`);
  }

  /** Search FMCSA carriers */
  async searchCarriers(params: { name?: string; state?: string; limit?: number }) {
    return this.http.post("/v1/aviation/fmcsa/search", params);
  }
}
