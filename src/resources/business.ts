import { HttpClient } from "../client";

export class Business {
  constructor(private http: HttpClient) {}

  /** Search SAM.gov registered entities */
  async searchSAM(params: { search?: string; ueiSAM?: string; cageCode?: string; state?: string; limit?: number; offset?: number }) {
    return this.http.post("/v1/business/sam/search", params);
  }

  /** Look up a SAM.gov entity by UEI */
  async lookupByUEI(uei: string) {
    return this.http.get(`/v1/business/sam/entity/${encodeURIComponent(uei)}`);
  }
}
