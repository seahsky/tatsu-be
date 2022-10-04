import { registerAs } from '@nestjs/config';
import { IMagicEdenConfig } from 'src/interfaces/magic-eden-config';

const MagicEdenConfig = registerAs(
  'magiceden',
  (): IMagicEdenConfig => ({
    endpoint: process.env.MAGICEDEN_API_ENDPOINT,
    defaultCollection: process.env.MAGICEDEN_DEFAULT_COLLECTION,
  }),
);

export default MagicEdenConfig;
