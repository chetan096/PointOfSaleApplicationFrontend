import { TestBed, inject } from '@angular/core/testing';

import { CashdrawerService } from './cashdrawer.service';

describe('CashdrawerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashdrawerService]
    });
  });

  it('should be created', inject([CashdrawerService], (service: CashdrawerService) => {
    expect(service).toBeTruthy();
  }));
});
