import { registerAs } from '@nestjs/config';
import { IHttpConfig } from 'src/interfaces/http-config';

const HttpConfig = registerAs(
  'http',
  (): IHttpConfig => ({
    timeout: parseInt(process.env.HTTP_TIMEOUT) || 5000,
  }),
);

export default HttpConfig;
