import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdPartyModule } from '../third-party/third-party.module';
import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { FeedbackRepository } from './feedback.repository';
import { Feedback } from './entities/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback]), ThirdPartyModule],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository],
  exports: [FeedbackRepository],
})
export class FeedbackModule {}
