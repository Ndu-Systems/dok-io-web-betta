/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PracticesService } from './practices.service';

describe('Service: Practices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PracticesService]
    });
  });

  it('should ...', inject([PracticesService], (service: PracticesService) => {
    expect(service).toBeTruthy();
  }));
});
