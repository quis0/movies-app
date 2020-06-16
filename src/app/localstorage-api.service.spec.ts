import { TestBed } from '@angular/core/testing';

import { LocalstorageApiService } from './localstorage-api.service';

describe('LocalstorageApiService', () => {
  let service: LocalstorageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
