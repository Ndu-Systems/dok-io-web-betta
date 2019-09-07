/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QueeService } from './quee.service';

describe('Service: Quee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueeService]
    });
  });

  it('should ...', inject([QueeService], (service: QueeService) => {
    expect(service).toBeTruthy();
  }));
});
