import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import SolanaConfig from 'src/config/solana.config';
import { SolanaController } from './solana.controller';
import { SolanaService } from './solana.service';

@Module({
  imports: [
    ConfigModule.forFeature(SolanaConfig),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('solana.endpoint'),
        timeout: configService.get<number>('http.timeout'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SolanaController],
  providers: [SolanaService],
})
export class SolanaModule {}
