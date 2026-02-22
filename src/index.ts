import { HttpClient, ComplianceGridOptions, ApiError } from "./client";
import { Compliance } from "./resources/compliance";
import { AES } from "./resources/aes";
import { HSCodes } from "./resources/hs";
import { Firearms } from "./resources/firearms";
import { Pharma } from "./resources/pharma";
import { Financial } from "./resources/financial";
import { Aviation } from "./resources/aviation";
import { Maritime } from "./resources/maritime";
import { Business } from "./resources/business";
import { Legal } from "./resources/legal";
import { FCC } from "./resources/fcc";
import { AI } from "./resources/ai";

export class ComplianceGrid {
  readonly compliance: Compliance;
  readonly aes: AES;
  readonly hs: HSCodes;
  readonly firearms: Firearms;
  readonly pharma: Pharma;
  readonly financial: Financial;
  readonly aviation: Aviation;
  readonly maritime: Maritime;
  readonly business: Business;
  readonly legal: Legal;
  readonly fcc: FCC;
  readonly ai: AI;

  constructor(opts: ComplianceGridOptions) {
    const http = new HttpClient(opts);
    this.compliance = new Compliance(http);
    this.aes = new AES(http);
    this.hs = new HSCodes(http);
    this.firearms = new Firearms(http);
    this.pharma = new Pharma(http);
    this.financial = new Financial(http);
    this.aviation = new Aviation(http);
    this.maritime = new Maritime(http);
    this.business = new Business(http);
    this.legal = new Legal(http);
    this.fcc = new FCC(http);
    this.ai = new AI(http);
  }
}

export { ComplianceGridOptions, ApiError } from "./client";
export { Compliance } from "./resources/compliance";
export { AES } from "./resources/aes";
export { HSCodes } from "./resources/hs";
export { Firearms } from "./resources/firearms";
export { Pharma } from "./resources/pharma";
export { Financial } from "./resources/financial";
export { Aviation } from "./resources/aviation";
export { Maritime } from "./resources/maritime";
export { Business } from "./resources/business";
export { Legal } from "./resources/legal";
export { FCC } from "./resources/fcc";
export { AI, ChatMessage, ChatResponse } from "./resources/ai";

export default ComplianceGrid;
