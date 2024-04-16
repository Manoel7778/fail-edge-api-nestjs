import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FailAutomationEdgeController } from './fail.controller';
import { FailAutomationEdge } from './fail.service';

@Module({
  providers: [FailAutomationEdge],
  controllers: [FailAutomationEdgeController],
  imports: [HttpModule]
})
export class failAutomationEdgeModule {}
