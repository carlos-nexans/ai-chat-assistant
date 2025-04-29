import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { ServerResponse } from 'node:http';
import { ResponseStreamEvent } from 'openai/resources/responses/responses';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return "ok"
  }

  @Post('post')
  async startThread(@Body() threadMessage: StartThreadInput, @Response() res: ServerResponse): Promise<void> {
    // TOOD: perform security checks on the message
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const onPayload = (payload: ResponseStreamEvent) => {
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    }

    await this.appService.startThread(threadMessage, onPayload);

    res.end();
  }

  @Get('/threads')
  async getThreads(): Promise<Thread[]> {
    return [];
  }
}
