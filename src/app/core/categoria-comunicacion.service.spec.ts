import { TestBed, inject } from '@angular/core/testing';

import { CategoriaComunicacionService } from './categoria-comunicacion.service';

describe('CategoriaComunicacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaComunicacionService]
    });
  });

  it('should be created', inject([CategoriaComunicacionService], (service: CategoriaComunicacionService) => {
    expect(service).toBeTruthy();
  }));
});
