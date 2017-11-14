import { TestBed, inject } from '@angular/core/testing';

import { PoblacionService } from './poblacion.service';

describe('PoblacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoblacionService]
    });
  });

  it('should be created', inject([PoblacionService], (service: PoblacionService) => {
    expect(service).toBeTruthy();
  }));
});
