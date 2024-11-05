import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatRequestDto } from './dto/chat-request.dto';
import { GenerateRequestDto } from './dto/generate-request.dto';

@Injectable()
export class OllamaService {
  private readonly baseUrl: string;
  private readonly basePath: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>('OLLAMA_HOST');
    this.basePath = this.configService.get<string>('OLLAMA_PATH');
  }

  async generateText(generateRequestDto: GenerateRequestDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${this.baseUrl}/${this.basePath}/generate`,
      generateRequestDto,
    );

    return data;
  }

  async chat(chatRequestDto: ChatRequestDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${this.baseUrl}/${this.basePath}/chat`,
      chatRequestDto,
    );

    return data;
  }

  async listRunningModels() {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}/${this.basePath}/ps`,
    );

    return data;
  }

  async listTags() {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}/${this.basePath}/tags`,
    );

    return data;
  }

  async getVersion() {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}/${this.basePath}/version`,
    );
    return data;
  }

  async createEmbeddings(prompt: string, model: string) {
    const payload = {
      model,
      prompt,
    };

    const { data } = await this.httpService.axiosRef.post(
      `${this.baseUrl}/${this.basePath}/embeddings`,
      payload,
    );
    return data;
  }

  async heartbeat() {
    const { status } = await this.httpService.axiosRef.head(`${this.baseUrl}/`);
    return {
      status: status === 200 ? 'Ollama service is up' : 'Service unavailable',
    };
  }
}
