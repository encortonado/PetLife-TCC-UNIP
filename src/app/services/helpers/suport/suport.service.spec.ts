import { TestBed } from '@angular/core/testing';

import { SuportService } from './suport.service';

describe('SuportService', () => {
  let service: SuportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
