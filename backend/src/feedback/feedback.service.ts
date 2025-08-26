import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackRepository } from './feedback.repository';
import { OpenAiGateway } from 'src/third-party/services/ai-gateway/openai.gateway';
import { AiGatewayInterface } from 'src/third-party/interface/ai-gateway.interface';
import { THIRD_PARTY_VENDOR_TYPES } from 'src/third-party/constants';
import { parseLLMJson } from './utils/parse-json.utill';

@Injectable()
export class FeedbackService {

    private readonly logger = new Logger(FeedbackService.name);
  constructor(
    private readonly feedbackRepo: FeedbackRepository,
    @Inject(THIRD_PARTY_VENDOR_TYPES.AI_GATEWAY_PROVIDER)
    private readonly aiGateway: AiGatewayInterface,
  ) {}
  async create(dto: CreateFeedbackDto) {
    try{
        const rawData = await this.aiGateway.createPrompt(dto.rawText)
        const data = parseLLMJson(rawData as string);
    return this.feedbackRepo.createFeedback(dto.rawText, data);
    }
    catch(error){
      this.logger.error(`Feedback: Error creating a feedback: ${JSON.stringify(error)}`);
      throw new BadRequestException('Error creating a feedback')
    }
  }

  // findAll() {
  //   return `This action returns all feedback`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} feedback`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} feedback`;
  // }
}
