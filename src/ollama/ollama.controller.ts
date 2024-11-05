import { OllamaService } from './ollama.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { GenerateRequestDto } from './dto/generate-request.dto';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post('generate')
  async generateText(@Body() generateRequestDto: GenerateRequestDto) {
    return this.ollamaService.generateText(generateRequestDto);
  }

  @Post('chat')
  async chat(@Body() chatRequestDto: ChatRequestDto) {
    return this.ollamaService.chat(chatRequestDto);
  }

  @Get('ps')
  async listRunningModels() {
    return this.ollamaService.listRunningModels();
  }

  @Get('tags')
  async listTags() {
    return this.ollamaService.listTags();
  }

  @Get('version')
  async getVersion() {
    return this.ollamaService.getVersion();
  }

  @Post('embeddings')
  async createEmbeddings(
    @Body('prompt') prompt: string,
    @Body('model') model: string,
  ) {
    return this.ollamaService.createEmbeddings(prompt, model);
  }

  @Get('heartbeat')
  async heartbeat() {
    return this.ollamaService.heartbeat();
  }
}
