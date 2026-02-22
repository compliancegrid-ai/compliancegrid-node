import { HttpClient } from "../client";

export interface ScreeningParty {
  name: string;
  country?: string;
  type?: "CONSIGNEE" | "SHIPPER" | "END_USER" | "OTHER";
}

export interface ScreeningResult {
  party: ScreeningParty;
  status: string;
  matchCount: number;
  matches: unknown[];
  listsChecked: string[];
}

export interface ScreeningResponse {
  success: boolean;
  data: {
    screeningId: string;
    timestamp: string;
    results: ScreeningResult[];
    summary: { total: number; clear: number; hits: number; warnings: number };
  };
}

export class Compliance {
  constructor(private http: HttpClient) {}

  /** Screen parties against OFAC SDN, BIS Entity List, DPL, ITAR, and more */
  async screenParties(parties: ScreeningParty[]) {
    return this.http.post<ScreeningResponse>("/v1/compliance/restricted-party-screening", { parties });
  }

  /** Search the consolidated screening list */
  async searchScreeningList(query: string) {
    return this.http.get("/v1/compliance/search", { query });
  }

  /** Check if goods are prohibited for a destination */
  async checkProhibitedGoods(params: { item: string; destinationCountry: string; originCountry?: string }) {
    return this.http.post("/v1/compliance/prohibited-goods", params);
  }

  /** AI-powered HS classification */
  async classifyHS(params: { description: string; destinationCountry?: string }) {
    return this.http.post("/v1/compliance/hs-classification", params);
  }

  /** Get guidance on improving product descriptions for customs */
  async descriptionGuidance(params: { description: string }) {
    return this.http.post("/v1/compliance/description-guidance", params);
  }

  /** Determine if an export license is required */
  async checkExportLicense(params: { item: string; destinationCountry: string; endUse?: string; eccn?: string }) {
    return this.http.post("/v1/compliance/export-license", params);
  }
}
