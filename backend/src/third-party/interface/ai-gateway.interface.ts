export interface AiGatewayInterface {
  createPrompt(rawText: string): Promise<string | null>;
}
