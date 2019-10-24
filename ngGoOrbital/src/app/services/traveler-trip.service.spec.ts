import { TestBed } from '@angular/core/testing';

import { TravelerTripService } from './traveler-trip.service';

describe('TravelerTripService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TravelerTripService = TestBed.get(TravelerTripService);
    expect(service).toBeTruthy();
  });
});
