export interface ComplianceGridOptions {
  /** Your ComplianceGrid API key (cg_sk_... or cg_pk_...) */
  apiKey: string;
  /** Override base URL. Defaults based on key prefix. */
  baseUrl?: string;
  /** Request timeout in ms (default 30000) */
  timeout?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
  _sandbox?: boolean;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public response?: unknown
  ) {
    super(message);
    this.name = "ComplianceGridApiError";
  }
}

export class HttpClient {
  private baseUrl: string;
  private headers: Record<string, string>;
  private timeout: number;

  constructor(opts: ComplianceGridOptions) {
    const isSandbox = opts.apiKey.startsWith("cg_sk_");
    this.baseUrl =
      opts.baseUrl ||
      (isSandbox
        ? "https://sandbox.api.compliancegrid.ai"
        : "https://api.compliancegrid.ai");
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": opts.apiKey,
    };
    this.timeout = opts.timeout ?? 30_000;
  }

  async get<T = unknown>(path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(path, this.baseUrl);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== "") url.searchParams.set(k, v);
      }
    }
    return this.request<T>("GET", url.toString());
  }

  async post<T = unknown>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("POST", new URL(path, this.baseUrl).toString(), body);
  }

  async delete<T = unknown>(path: string): Promise<T> {
    return this.request<T>("DELETE", new URL(path, this.baseUrl).toString());
  }

  private async request<T>(method: string, url: string, body?: unknown): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await fetch(url, {
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new ApiError(
          res.status,
          json?.error?.code || json?.error || "UNKNOWN",
          json?.error?.message || json?.message || `HTTP ${res.status}`,
          json
        );
      }

      return json as T;
    } finally {
      clearTimeout(timer);
    }
  }
}
