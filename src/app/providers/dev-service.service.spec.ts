import { TestBed } from '@angular/core/testing';

import { DevServiceService } from './dev-service.service';

describe('DevServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevServiceService = TestBed.get(DevServiceService);
    expect(service).toBeTruthy();
  });
});
