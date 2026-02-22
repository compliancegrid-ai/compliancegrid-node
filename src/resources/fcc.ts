import { HttpClient } from "../client";

export class FCC {
  constructor(private http: HttpClient) {}

  /** Search FCC ULS licenses */
  async searchLicenses(params: {
    search?: string; callSign?: string; frn?: string;
    radioService?: string; state?: string; limit?: number; offset?: number;
  }) {
    return this.http.post("/v1/fcc/licenses", params);
  }

  /** Look up a license by call sign */
  async lookupByCallSign(callSign: string) {
    return this.http.get(`/v1/fcc/licenses/callsign/${encodeURIComponent(callSign)}`);
  }
}
