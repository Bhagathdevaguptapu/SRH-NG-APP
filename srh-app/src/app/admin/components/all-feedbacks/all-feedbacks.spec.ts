import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeedbacksComponent } from './all-feedbacks';

describe('AllFeedbacks', () => {
  let component: AllFeedbacksComponent;
  let fixture: ComponentFixture<AllFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllFeedbacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
