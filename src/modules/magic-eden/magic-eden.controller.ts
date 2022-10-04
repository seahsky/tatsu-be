import { JsonMetadata, Metadata, Nft } from '@metaplex-foundation/js';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
  CollectionListingRequest,
  CollectionSymbolRequest,
  GetNFTByAddressRequest,
  GetNFTsByAddressRequest,
  ListingRequest,
  NFTActivitesListingRequest,
} from 'src/classes/api-request';
import {
  MagicEdenActivity,
  MagicEdenCollection,
  MagicEdenCollectionActivity,
  MagicEdenCollectionStats,
} from 'src/interfaces/magic-eden-response';
import { MagicEdenService } from './magic-eden.service';

@Controller('magic-eden')
export class MagicEdenController {
  constructor(private readonly magicEdenService: MagicEdenService) {}

  @Get('collection')
  @ApiQuery({ type: CollectionSymbolRequest, required: true })
  async getCollectionInfo(
    @Query() request: CollectionSymbolRequest,
  ): Promise<MagicEdenCollectionStats> {
    return await this.magicEdenService.getCollectionInfo(request);
  }

  @Get('collection/listing')
  @ApiQuery({ type: CollectionListingRequest, required: true })
  async getCollectionListings(
    @Query() request: CollectionListingRequest,
  ): Promise<MagicEdenCollection[]> {
    return await this.magicEdenService.getCollectionListings(request);
  }

  @Get('collection/activities')
  @ApiQuery({ type: CollectionListingRequest, required: true })
  async getCollectionActivities(
    @Query() request: CollectionListingRequest,
  ): Promise<MagicEdenCollectionActivity[]> {
    console.log(request.limit);
    return await this.magicEdenService.getCollectionActivities(request);
  }

  @Get('nft/:mintAddress')
  async getNFTInfoByMintAddress(
    @Param('mintAddress') mintAddress: string,
  ): Promise<Nft> {
    const serviceRequest: GetNFTByAddressRequest = {
      mintAddress,
    };
    return await this.magicEdenService.getNFTInfoByMintAddress(serviceRequest);
  }

  @Get('nft/:mintAddress/activities')
  @ApiQuery({ type: ListingRequest, required: true })
  async getNFTActivities(
    @Param('mintAddress') mintAddress: string,
    @Query() request: ListingRequest,
  ): Promise<MagicEdenActivity[]> {
    const serviceRequest: NFTActivitesListingRequest = {
      mintAddress,
      ...request,
    };
    const test = await this.magicEdenService.getNFTActivities(serviceRequest);
    console.log(test);
    return test;
  }

  @Get('nft/list/:walletAddress')
  @ApiQuery({ type: ListingRequest, required: true })
  async getNFTsByWalletAddress(
    @Param('walletAddress') walletAddress: string,
    @Query() request: ListingRequest,
  ): Promise<Nft[]> {
    const serviceRequest: GetNFTsByAddressRequest = {
      walletAddress,
      ...request,
    };
    return await this.magicEdenService.getNFTsByWalletAddress(serviceRequest);
  }
}
