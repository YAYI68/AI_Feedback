import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Feedback } from "./entities/feedback.entity";
import { ExtractedFeedback } from "./interface/feeback.interface";




@Injectable()
export class FeedbackRepository {
  constructor(
    @InjectRepository(Feedback)
    private feedbackModel: Repository<Feedback>,
  ) {}

  createFeedback(rawText:string,data:ExtractedFeedback){
    const feedback = this.feedbackModel.create({
      rawText: rawText,
      customerName: data.customerName,
      productMentioned: data.productMentioned,
      sentiment: data.sentiment,
      summary: data.summary,
    });
    return this.feedbackModel.save(feedback);
  }

}