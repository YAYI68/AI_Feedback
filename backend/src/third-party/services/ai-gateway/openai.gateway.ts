import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ExtractedFeedback } from 'src/feedback/interface/feeback.interface';
import { OpenAiModelEnum } from 'src/third-party/enums/openai.enum';
import { AiGatewayInterface } from 'src/third-party/interface/ai-gateway.interface';

/**
 * OpenAi provider
 */
@Injectable()
export class OpenAiGateway implements AiGatewayInterface {
  private readonly client: OpenAI;
  private readonly logger = new Logger(OpenAiGateway.name);

  /**
   * OpenAi provider constructor
   */
  constructor(private configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

 async createPrompt(rawText:string){
     try{
        const response = await this.client.chat.completions.create({
        model: OpenAiModelEnum.Gpt4o,
        messages: [
            {
                role: 'system',
                content: `
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
      `
    },
    { role: 'user', content: rawText }
  ],
  response_format: { type: 'json_object' },
});

return response.choices[0].message?.content;

     }
     catch(error){
        this.logger.error(
              `An error occurred while running the prompts: ${error.message}`,
              error.stack,
            );
            throw new Error(`An error occurred while running the prompts`);
     }
  }

}
