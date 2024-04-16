import { Controller, Get, Req, Res } from '@nestjs/common';
import { FailAutomationEdge } from './fail.service';
import { Request, Response } from 'express';


@Controller('fail/api/v1')
export class FailAutomationEdgeController {

  constructor(private readonly failureAutomationEdge: FailAutomationEdge) { }

  @Get('Edge')
  async FailureEdge(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      res.status(200).send(await this.failureAutomationEdge.filterDateEdge())
    } catch (error) {
      res.status(403).send({ status: false, message: error.message })
    }
  }
}