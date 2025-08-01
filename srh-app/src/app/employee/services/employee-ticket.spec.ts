import { TestBed } from '@angular/core/testing';

import { EmployeeTicket } from './employee-ticket';

describe('EmployeeTicket', () => {
  let service: EmployeeTicket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeTicket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
