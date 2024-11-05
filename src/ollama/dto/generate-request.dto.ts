import { IsObject, IsOptional, IsString } from 'class-validator';

export class GenerateRequestDto {
  @IsString()
  model: string;

  @IsString()
  prompt: string;

  @IsOptional()
  @IsString()
  stream?: boolean;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @IsObject()
  options?: Record<string, any>;
}
