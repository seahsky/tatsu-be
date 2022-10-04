import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
} from '@nestjs/axios/dist/interfaces';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { ConfigType } from '@nestjs/config';
import HttpConfig from 'src/config/http.config';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(
    @Inject(HttpConfig.KEY)
    private httpConfig: ConfigType<typeof HttpConfig>,
  ) {}
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: this.httpConfig.timeout,
    };
  }
}
