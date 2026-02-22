import { HttpClient } from "../client";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    reply: string;
    toolsUsed: { name: string; arguments: string }[];
  };
}

export class AI {
  constructor(private http: HttpClient) {}

  /** Send a message to the ComplianceGrid AI assistant */
  async chat(messages: ChatMessage[], sessionId?: string) {
    return this.http.post<ChatResponse>("/v1/ai/chat", { messages, sessionId });
  }
}
