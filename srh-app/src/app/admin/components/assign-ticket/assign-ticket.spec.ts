import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicket } from './assign-ticket';

describe('AssignTicket', () => {
  let component: AssignTicket;
  let fixture: ComponentFixture<AssignTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTicket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
