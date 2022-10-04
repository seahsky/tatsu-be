import { Test, TestingModule } from '@nestjs/testing';
import { MagicEdenController } from './magic-eden.controller';

describe('MagicEdenController', () => {
  let controller: MagicEdenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagicEdenController],
    }).compile();

    controller = module.get<MagicEdenController>(MagicEdenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
