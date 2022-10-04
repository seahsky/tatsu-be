import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import MagicEdenConfig from 'src/config/magiceden.config';
import MetaplexConfig from 'src/config/metaplex.config';
import { MagicEdenController } from './magic-eden.controller';
import { MagicEdenService } from './magic-eden.service';

@Module({
  imports: [
    ConfigModule.forFeature(MagicEdenConfig),
    ConfigModule.forFeature(MetaplexConfig),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('magiceden.endpoint'),
        timeout: configService.get<number>('http.timeout'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MagicEdenController],
  providers: [MagicEdenService],
})
export class MagicEdenModule {}
