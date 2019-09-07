/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedicalaidService } from './medicalaid.service';

describe('Service: Medicalaid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalaidService]
    });
  });

  it('should ...', inject([MedicalaidService], (service: MedicalaidService) => {
    expect(service).toBeTruthy();
  }));
});
