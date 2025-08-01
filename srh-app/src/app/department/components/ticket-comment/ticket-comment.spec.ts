import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketComment } from './ticket-comment';

describe('TicketComment', () => {
  let component: TicketComment;
  let fixture: ComponentFixture<TicketComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
