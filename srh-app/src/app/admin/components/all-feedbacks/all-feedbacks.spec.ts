import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeedbacks } from './all-feedbacks';

describe('AllFeedbacks', () => {
  let component: AllFeedbacks;
  let fixture: ComponentFixture<AllFeedbacks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllFeedbacks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFeedbacks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
