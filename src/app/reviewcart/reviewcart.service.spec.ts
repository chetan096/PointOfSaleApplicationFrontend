import { TestBed, inject } from '@angular/core/testing';

import { ReviewcartService } from './reviewcart.service';

describe('ReviewcartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewcartService]
    });
  });

  it('should be created', inject([ReviewcartService], (service: ReviewcartService) => {
    expect(service).toBeTruthy();
  }));
});
