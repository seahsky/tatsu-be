import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import httpConfig from './config/http.config';
import { MagicEdenModule } from './modules/magic-eden/magic-eden.module';
import { HttpConfigService } from './services/http-config/http-config.service';
import { SolanaModule } from './modules/solana/solana.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [httpConfig] }),
    MagicEdenModule,
    ConfigModule,
    SolanaModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpConfigService],
})
export class AppModule {}
