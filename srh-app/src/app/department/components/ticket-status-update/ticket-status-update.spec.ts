import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStatusUpdate } from './ticket-status-update';

describe('TicketStatusUpdate', () => {
  let component: TicketStatusUpdate;
  let fixture: ComponentFixture<TicketStatusUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketStatusUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketStatusUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
