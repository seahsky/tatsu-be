import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import applyMixins from 'src/utils/mixin';

export class CollectionSymbolRequest {
  @IsString()
  @ApiProperty({ required: true })
  collectionSymbol: string;
}

export class ListingRequest {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ required: false, default: 0 })
  offset: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ required: false, default: 20 })
  limit: number;
}

export interface CollectionListingRequest
  extends CollectionSymbolRequest,
    ListingRequest {}
export class CollectionListingRequest {}
applyMixins(CollectionListingRequest, [
  CollectionSymbolRequest,
  ListingRequest,
]);

export class GetNFTsByAddressRequest extends ListingRequest {
  @IsString()
  @ApiProperty({ required: true })
  walletAddress: string;
}

export class GetNFTByAddressRequest {
  @IsString()
  @ApiProperty({ required: true })
  mintAddress: string;
}

export class NFTActivitesListingRequest extends ListingRequest {
  @IsString()
  @ApiProperty({ required: true })
  mintAddress: string;
}
