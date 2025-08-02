import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmployeeTickets } from './all-employee-tickets';

describe('AllEmployeeTickets', () => {
  let component: AllEmployeeTickets;
  let fixture: ComponentFixture<AllEmployeeTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllEmployeeTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEmployeeTickets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
