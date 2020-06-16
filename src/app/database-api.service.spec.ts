import { TestBed } from '@angular/core/testing';

import { DatabaseAPIService } from './database-api.service';

describe('DatabaseAPIService', () => {
  let service: DatabaseAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
