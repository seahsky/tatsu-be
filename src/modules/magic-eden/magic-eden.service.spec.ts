import { Test, TestingModule } from '@nestjs/testing';
import { MagicEdenService } from './magic-eden.service';

describe('MagicEdenService', () => {
  let service: MagicEdenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MagicEdenService],
    }).compile();

    service = module.get<MagicEdenService>(MagicEdenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
