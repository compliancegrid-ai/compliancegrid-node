import { HttpClient } from "../client";

export class Maritime {
  constructor(private http: HttpClient) {}

  /** Search vessels by name, IMO, MMSI, flag, or type */
  async searchVessels(params: { name?: string; imo?: string; mmsi?: string; flag?: string; vesselType?: string; limit?: number }) {
    return this.http.post("/v1/maritime/vessels", params);
  }

  /** Look up a vessel by IMO number */
  async lookupByIMO(imo: string) {
    return this.http.get(`/v1/maritime/vessels/imo/${encodeURIComponent(imo)}`);
  }

  /** Search C-TPAT certified partners */
  async searchCTPAT(params: { companyName?: string; sviNumber?: string; tier?: string; limit?: number }) {
    return this.http.post("/v1/maritime/ctpat", params);
  }
}
