import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProductReviewsComponent } from './display-product-reviews.component';

describe('DisplayProductReviewsComponent', () => {
  let component: DisplayProductReviewsComponent;
  let fixture: ComponentFixture<DisplayProductReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProductReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayProductReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
