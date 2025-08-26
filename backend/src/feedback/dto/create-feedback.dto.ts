// create-feedback.dto.ts
import { IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  rawText: string;
}