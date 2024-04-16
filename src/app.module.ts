import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { failAutomationEdgeModule } from './fail/fail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.prd.env'
    }),
    failAutomationEdgeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
