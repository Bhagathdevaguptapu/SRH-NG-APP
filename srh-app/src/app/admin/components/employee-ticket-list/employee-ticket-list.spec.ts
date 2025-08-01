import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTicketList } from './employee-ticket-list';

describe('EmployeeTicketList', () => {
  let component: EmployeeTicketList;
  let fixture: ComponentFixture<EmployeeTicketList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTicketList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTicketList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
