import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTickets } from './view-tickets';

describe('ViewTickets', () => {
  let component: ViewTickets;
  let fixture: ComponentFixture<ViewTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTickets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
