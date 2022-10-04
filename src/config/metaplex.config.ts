import { registerAs } from '@nestjs/config';
import { IMetaplexConfig } from 'src/interfaces/metaplex-config';

const MetaplexConfig = registerAs(
  'metaplex',
  (): IMetaplexConfig => ({
    clusterApiUrl: process.env.METAPLEX_CLUSTER_API_URL,
  }),
);

export default MetaplexConfig;
