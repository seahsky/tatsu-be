import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, lastValueFrom, map, retry } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CollectionSymbolRequest } from 'src/classes/api-request';
import { SolanaCollectionStats } from 'src/interfaces/solana-response';

@Injectable()
export class SolanaService {
  constructor(private readonly httpService: HttpService) {}

  async getCollectionInfo(
    request: CollectionSymbolRequest,
  ): Promise<SolanaCollectionStats> {
    return await this.handleHttpResponse(
      this.httpService.get<SolanaCollectionStats>(
        `/collection/${request.collectionSymbol}`,
      ),
    );
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
