import { Injectable } from '@nestjs/common';
import { OpenAI } from "openai";
import { ResponseStreamEvent } from 'openai/resources/responses/responses';

@Injectable()
export class AppService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI();
  }

  async startThread(threadMessage: StartThreadInput, onPayload: (payload: ResponseStreamEvent) => void): Promise<void> {
    const stream = await this.openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: threadMessage.message.content,
        },
      ],
      stream: true,
    });

    for await (const event of stream) {
      onPayload(event);
    }
  }
}
