import { TestBed } from '@angular/core/testing';

import { EmployeeServService } from './employee-serv.service';

describe('EmployeeServService', () => {
  let service: EmployeeServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
