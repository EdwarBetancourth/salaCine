import { Test, TestingModule } from '@nestjs/testing';
import { ConcurrentController } from './concurrent.controller';
import { ConcurrentService } from './concurrent.service';

describe('ConcurrentController', () => {
  let controller: ConcurrentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcurrentController],
      providers: [ConcurrentService],
    }).compile();

    controller = module.get<ConcurrentController>(ConcurrentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
