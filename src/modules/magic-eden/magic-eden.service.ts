import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { lastValueFrom, map, Observable, retry } from 'rxjs';
import MagicEdenConfig from 'src/config/magiceden.config';
import {
  MagicEdenActivity,
  MagicEdenCollection,
  MagicEdenCollectionActivity,
  MagicEdenCollectionStats,
} from 'src/interfaces/magic-eden-response';
import { AxiosResponse } from 'axios';
import {
  CollectionListingRequest,
  CollectionSymbolRequest,
  GetNFTByAddressRequest,
  GetNFTsByAddressRequest,
  NFTActivitesListingRequest,
} from 'src/classes/api-request';
import { Cluster, clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { JsonMetadata, Metadata, Metaplex, Nft } from '@metaplex-foundation/js';
import MetaplexConfig from 'src/config/metaplex.config';

@Injectable()
export class MagicEdenService {
  private readonly metaplex: Metaplex;
  private readonly gRpcConnection: Connection;

  constructor(
    @Inject(MagicEdenConfig.KEY)
    private magicEdenConfig: ConfigType<typeof MagicEdenConfig>,
    @Inject(MetaplexConfig.KEY)
    private metaplexConfig: ConfigType<typeof MetaplexConfig>,
    private readonly httpService: HttpService,
  ) {
    this.gRpcConnection = new Connection(
      clusterApiUrl(this.metaplexConfig.clusterApiUrl as Cluster),
    );
    this.metaplex = new Metaplex(this.gRpcConnection);
  }

  async getCollectionInfo(
    request: CollectionSymbolRequest,
  ): Promise<MagicEdenCollectionStats> {
    return await this.handleHttpResponse(
      this.httpService.get<MagicEdenCollectionStats>(
        `/collections/${request.collectionSymbol}/stats`,
      ),
    );
  }

  async getCollectionListings(
    request: CollectionListingRequest,
  ): Promise<MagicEdenCollection[]> {
    return await this.handleHttpResponse(
      this.httpService.get<MagicEdenCollection[]>(
        `/collections/${request.collectionSymbol}/listings`,
        {
          params: {
            offset: request.offset,
            limit: request.limit,
          },
        },
      ),
    );
  }

  async getCollectionActivities(
    request: CollectionListingRequest,
  ): Promise<MagicEdenCollectionActivity[]> {
    return await this.handleHttpResponse(
      this.httpService.get<MagicEdenCollectionActivity[]>(
        `/collections/${request.collectionSymbol}/activities`,
        {
          params: {
            offset: request.offset,
            limit: request.limit,
          },
        },
      ),
    );
  }

  async getNFTInfoByMintAddress(request: GetNFTByAddressRequest): Promise<Nft> {
    const mintPubKey = new PublicKey(request.mintAddress);
    return (await this.metaplex
      .nfts()
      .findByMint({ mintAddress: mintPubKey })
      .run()) as Nft;
  }

  async getNFTActivities(request: NFTActivitesListingRequest) {
    return await this.handleHttpResponse(
      this.httpService.get<MagicEdenActivity[]>(
        `/tokens/${request.mintAddress}/activities`,
        {
          params: {
            offset: request.offset,
            limit: request.limit,
          },
        },
      ),
    );
  }

  async getNFTsByWalletAddress(
    request: GetNFTsByAddressRequest,
  ): Promise<Nft[]> {
    const result: Nft[] = [];
    const walletPubKey = new PublicKey(request.walletAddress);
    const queryMeta = (await this.metaplex
      .nfts()
      .findAllByOwner({ owner: walletPubKey })
      .run()) as Metadata<JsonMetadata<string>>[];

    const resultMeta = queryMeta.filter((m) => m.symbol.includes('MKLN'));

    for (const metadata of resultMeta) {
      result.push((await this.metaplex.nfts().load({ metadata }).run()) as Nft);
    }

    return result.slice(request.offset, request.limit);
  }

  private handleHttpResponse<T>(
    rawResponse: Observable<AxiosResponse<T>>,
  ): Promise<T> {
    return lastValueFrom(
      rawResponse.pipe(
        map((response: AxiosResponse) => response.data),
        retry(3),
      ),
    );
  }
}
