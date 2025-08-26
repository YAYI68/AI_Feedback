import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, Content } from '@google/generative-ai';
import { AiGatewayInterface } from 'src/third-party/interface/ai-gateway.interface';

@Injectable()
export class GeminiGateway implements AiGatewayInterface {
  private readonly client: GoogleGenerativeAI;
  private readonly logger = new Logger(GeminiGateway.name);

  constructor(private configService: ConfigService) {
    this.client = new GoogleGenerativeAI(
      `${this.configService.get<string>('GEMINI_API_KEY')}`,
    );
  }

  async createPrompt(rawText: string) {
    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const systemPrompt = `
You are an assistant that extracts structured customer feedback from raw text.
Return your answer ONLY as valid JSON with this structure:
{
  "customerName": "John Doe",
  "productMentioned": "SuperWidget 3000",
  "sentiment": "Positive",
  "summary": "John had a great experience with the product."
}

        Rules:
        1. ONLY use the information explicitly present in the provided rawText. Do not infer, assume, or add any details not stated.
        2. "customerName" → Extract the full name if available. If only first name/nickname, use that. If none, return null.
        3. "productMentioned" → Extract the exact product name mentioned.
        4. "sentiment" → Classify as "Positive", "Negative", or "Neutral".
        5. "summary" → Provide a concise one-sentence summary in a neutral tone, based only on the rawText.
        6. Do not include any extra text outside the JSON.
      `;
      const contents: Content[] = [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nRaw Text:\n${rawText}` }] },
      ];

      const result = await model.generateContent({ contents });
      return result.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
    } catch (error) {
      this.logger.error(
        `An error occurred while running Gemini prompts: ${error.message}`,
        error.stack,
      );
      throw new Error('Gemini prompt execution failed');
    }
  }
}
