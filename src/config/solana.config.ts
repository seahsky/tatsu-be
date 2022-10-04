import { registerAs } from '@nestjs/config';
import { IApiConfig } from 'src/interfaces/api-config';

const SolanaConfig = registerAs(
  'solana',
  (): IApiConfig => ({
    endpoint: process.env.SOLANA_API_ENDPOINT,
  }),
);

export default SolanaConfig;
