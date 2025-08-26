import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { THIRD_PARTY_VENDOR_TYPES } from './constants';
import { OpenAiGateway } from './services/ai-gateway/openai.gateway';
import { AiGatewayEnum } from './enums/ai.enum';
import { GeminiGateway } from './services/ai-gateway/gemini.gateway';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
       OpenAiGateway,
       GeminiGateway,
     
    // AI Gateway
{
  provide: THIRD_PARTY_VENDOR_TYPES.AI_GATEWAY_PROVIDER,
  useFactory: (
    configService: ConfigService,
    openaiGatewayProvider: OpenAiGateway,
    geminiGatewayProvider: GeminiGateway,
  ) => {
    const aiProvider = configService.get('AI_GATEWAY_PROVIDER');
    switch (aiProvider.toLowerCase()) {
      case AiGatewayEnum.OpenAi:
        return openaiGatewayProvider;
      case AiGatewayEnum.Gemini:
        return geminiGatewayProvider;
      default:
        throw new Error(
          `Unknown ai gateway provider: ${aiProvider} encountered in config`,
        );
    }
  },
  inject: [ConfigService, OpenAiGateway, GeminiGateway],
},

  ],
  controllers: [],
  exports:[
    THIRD_PARTY_VENDOR_TYPES.AI_GATEWAY_PROVIDER,
  ]
})
export class ThirdPartyModule {}
