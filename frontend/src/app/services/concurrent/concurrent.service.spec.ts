import { TestBed } from '@angular/core/testing';

import { ConcurrentService } from './concurrent.service';

describe('ConcurrentService', () => {
  let service: ConcurrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcurrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
