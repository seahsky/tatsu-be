import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CollectionSymbolRequest } from 'src/classes/api-request';
import { SolanaCollectionStats } from 'src/interfaces/solana-response';
import { SolanaService } from './solana.service';

@Controller('solana')
export class SolanaController {
  constructor(private readonly solanaService: SolanaService) {}

  @Get('collection')
  @ApiQuery({ type: CollectionSymbolRequest, required: true })
  async getCollectionInfo(
    @Query() request: CollectionSymbolRequest,
  ): Promise<SolanaCollectionStats> {
    return await this.solanaService.getCollectionInfo(request);
  }
}
