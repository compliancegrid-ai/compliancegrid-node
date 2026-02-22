# ComplianceGrid Node.js / TypeScript SDK

Official SDK for the [ComplianceGrid API](https://www.compliancegrid.ai) — export compliance, sanctions screening, HS codes, and 12+ regulatory domains.

## Installation

```bash
npm install @compliancegrid/sdk
```

## Quick Start

```typescript
import ComplianceGrid from "@compliancegrid/sdk";

const cg = new ComplianceGrid({ apiKey: "cg_sk_your_sandbox_key_here" });

// Screen a party against all federal watchlists
const screening = await cg.compliance.screenParties([
  { name: "Acme Trading Co", country: "CN", type: "CONSIGNEE" },
]);
console.log(screening.data.summary);

// Classify an HS code
const hs = await cg.hs.classify({ description: "stainless steel kitchen knives" });
console.log(hs.data.classifications);

// Search FFL holders in Texas
const ffls = await cg.firearms.searchFFL({ state: "TX", city: "Houston", limit: 10 });
console.log(ffls.data.results);
```

## Authentication

ComplianceGrid uses API keys for authentication:

| Key Prefix | Environment | Endpoint |
|-----------|-------------|----------|
| `cg_sk_…` | Sandbox (mock data) | `sandbox.api.compliancegrid.ai` |
| `cg_pk_…` | Production (real data) | `api.compliancegrid.ai` |

The SDK **automatically routes** requests to the correct endpoint based on your key prefix.

Get your keys at [compliancegrid.ai/dashboard/developer](https://www.compliancegrid.ai/dashboard/developer).

## Available APIs

| Module | Description |
|--------|-------------|
| `cg.compliance` | Restricted party screening, prohibited goods, export license, HS classification |
| `cg.aes` | AES filing validation, preparation, and submission |
| `cg.hs` | HTS code search, AI classification, lookup, reference data |
| `cg.firearms` | ATF FFL search, verification, parsing, reference data |
| `cg.pharma` | DEA registration lookup, FDA drug search, shortages, recalls |
| `cg.financial` | SEC EDGAR, FDIC BankFind, FINRA BrokerCheck |
| `cg.aviation` | FAA aircraft registry, FMCSA carrier safety |
| `cg.maritime` | Vessel search, C-TPAT partner lookup |
| `cg.business` | SAM.gov entity search |
| `cg.legal` | OIG LEIE exclusion search |
| `cg.fcc` | FCC ULS license search |
| `cg.ai` | AI compliance assistant (powered by Claude) |

## Examples

### Restricted Party Screening

```typescript
const result = await cg.compliance.screenParties([
  { name: "Huawei Technologies", type: "OTHER" },
  { name: "Acme Corp", country: "DE", type: "CONSIGNEE" },
]);

for (const r of result.data.results) {
  console.log(`${r.party.name}: ${r.status} (${r.matchCount} matches)`);
}
```

### HS Code Search

```typescript
const result = await cg.hs.search("laptop computer");
for (const item of result.data.results) {
  console.log(`${item.htsNumber} — ${item.description} (Duty: ${item.general})`);
}
```

### DEA Registration Lookup

```typescript
const dea = await cg.pharma.lookupDEA("BJ1234563");
console.log(dea.data.name, dea.data.schedules);
```

### SEC EDGAR Search

```typescript
const sec = await cg.financial.searchSEC("Apple Inc");
console.log(sec.data.results[0].cik, sec.data.results[0].ticker);
```

### AI Compliance Assistant

```typescript
const chat = await cg.ai.chat([
  { role: "user", content: "What HS code applies to stainless steel kitchen knives from China?" },
]);
console.log(chat.data.reply);
console.log("Tools used:", chat.data.toolsUsed.map(t => t.name));
```

### FAA Aircraft Search

```typescript
const aircraft = await cg.aviation.searchAircraft({ manufacturer: "cessna", state: "WI" });
console.log(aircraft.data.results);
```

### Vessel Search

```typescript
const vessels = await cg.maritime.searchVessels({ name: "Ever Given" });
console.log(vessels.data.results);
```

## Error Handling

```typescript
import ComplianceGrid, { ApiError } from "@compliancegrid/sdk";

try {
  await cg.compliance.screenParties([{ name: "Test" }]);
} catch (err) {
  if (err instanceof ApiError) {
    console.error(`API Error ${err.statusCode}: [${err.code}] ${err.message}`);
  }
}
```

## Configuration

```typescript
const cg = new ComplianceGrid({
  apiKey: "cg_pk_your_production_key",
  baseUrl: "https://api.compliancegrid.ai",  // optional override
  timeout: 60000,                              // optional, default 30s
});
```

---

## cURL Examples

### Screen a party

```bash
curl -X POST https://sandbox.api.compliancegrid.ai/v1/compliance/restricted-party-screening \
  -H "Content-Type: application/json" \
  -H "x-api-key: cg_sk_your_sandbox_key" \
  -d '{"parties": [{"name": "Acme Trading Co", "country": "CN", "type": "CONSIGNEE"}]}'
```

### Search consolidated screening list

```bash
curl "https://sandbox.api.compliancegrid.ai/v1/compliance/search?query=huawei" \
  -H "x-api-key: cg_sk_your_sandbox_key"
```

### Classify an HS code

```bash
curl -X POST https://sandbox.api.compliancegrid.ai/v1/hs/classify \
  -H "Content-Type: application/json" \
  -H "x-api-key: cg_sk_your_sandbox_key" \
  -d '{"description": "stainless steel kitchen knives"}'
```

### Search FFL holders

```bash
curl "https://sandbox.api.compliancegrid.ai/v1/firearms/ffl/search?state=TX&city=Houston&limit=5" \
  -H "x-api-key: cg_sk_your_sandbox_key"
```

### DEA registration lookup

```bash
curl "https://sandbox.api.compliancegrid.ai/v1/pharma/dea/lookup/BJ1234563" \
  -H "x-api-key: cg_sk_your_sandbox_key"
```

### SEC EDGAR search

```bash
curl "https://sandbox.api.compliancegrid.ai/v1/financial/sec/search?q=Apple" \
  -H "x-api-key: cg_sk_your_sandbox_key"
```

### AI assistant chat

```bash
curl -X POST https://sandbox.api.compliancegrid.ai/v1/ai/chat \
  -H "Content-Type: application/json" \
  -H "x-api-key: cg_sk_your_sandbox_key" \
  -d '{"messages": [{"role": "user", "content": "Screen Huawei against watchlists"}]}'
```

### FAA aircraft search

```bash
curl "https://sandbox.api.compliancegrid.ai/v1/aviation/faa/aircraft/search?manufacturer=cessna&state=WI" \
  -H "x-api-key: cg_sk_your_sandbox_key"
```

### Vessel search

```bash
curl "https://sandbox.api.compliancegrid.ai/v1/maritime/vessels?name=ever+given" \
  -H "x-api-key: cg_sk_your_sandbox_key"
```

### SAM.gov entity search

```bash
curl "https://sandbox.api.compliancegrid.ai/v1/business/sam/search?q=lockheed" \
  -H "x-api-key: cg_sk_your_sandbox_key"
```

---

## License

MIT — [ComplianceGrid](https://www.compliancegrid.ai)
