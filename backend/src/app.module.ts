import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThirdPartyModule } from './third-party/third-party.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PostgreSqlModule } from './database/postgresql/postgres.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [

     ConfigModule.forRoot({
      isGlobal: true,
    }),
     
      // Throttling module which limits the number of requests per IP per minute
      ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: parseInt(config.get<string>('THROTTLE_TTL') ?? '60', 10),
            limit: parseInt(config.get<string>('THROTTLE_LIMIT') ?? '10', 10),
          },
        ],
      }),
    }),

    PostgreSqlModule,
    // ThirdPartyModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
     {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
