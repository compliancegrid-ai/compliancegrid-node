import { HttpClient } from "../client";

export class Firearms {
  constructor(private http: HttpClient) {}

  /** Search FFL holders by state, city, business name, etc. */
  async searchFFL(params: {
    fflNumber?: string; businessName?: string; licenseName?: string;
    state?: string; city?: string; zip?: string; licenseType?: string;
    limit?: number; offset?: number;
  }) {
    return this.http.post("/v1/firearms/ffl/search", params);
  }

  /** Verify a specific FFL number */
  async verifyFFL(fflNumber: string) {
    return this.http.get(`/v1/firearms/ffl/verify/${encodeURIComponent(fflNumber)}`);
  }

  /** Parse an FFL number into its components */
  async parseFFL(fflNumber: string) {
    return this.http.get(`/v1/firearms/ffl/parse/${encodeURIComponent(fflNumber)}`);
  }

  /** Get FFL database statistics */
  async stats() {
    return this.http.get("/v1/firearms/ffl/stats");
  }

  /** Get FFL license type reference data */
  async fflTypes() {
    return this.http.get("/v1/firearms/reference/ffl-types");
  }

  /** Get FEL (Federal Explosives License) types */
  async felTypes() {
    return this.http.get("/v1/firearms/reference/fel-types");
  }

  /** Get ATF regions */
  async regions() {
    return this.http.get("/v1/firearms/reference/regions");
  }

  /** Get state abbreviations */
  async states() {
    return this.http.get("/v1/firearms/reference/states");
  }
}
