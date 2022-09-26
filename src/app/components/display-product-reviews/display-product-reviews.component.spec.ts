import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product/product';
import { ReviewService } from 'src/app/services/review/review.service';

import { DisplayProductReviewsComponent } from './display-product-reviews.component';

describe('DisplayProductReviewsComponent', () => {
  let component: DisplayProductReviewsComponent;
  let fixture: ComponentFixture<DisplayProductReviewsComponent>;

  let localStore: any;
  let service: ReviewService;
  beforeEach(async () => {

    localStore = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));

    await TestBed.configureTestingModule({
      declarations: [DisplayProductReviewsComponent],
      imports: [HttpClientTestingModule],
      providers: [ReviewService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisplayProductReviewsComponent);
    component = fixture.componentInstance;
    component.productInfo = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    service = TestBed.inject(ReviewService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate average', () => {
    component.reviews =
      [
        { username: "1", timestamp: 1, description: "1", rating: 1 },
        { username: "2", timestamp: 2, description: "2", rating: 2 },
        { username: "3", timestamp: 3, description: "3", rating: 3 },
        { username: "4", timestamp: 4, description: "4", rating: 4 },
        { username: "5", timestamp: 5, description: "5", rating: 5 },
      ];
    component.calculateAvgRating();
    expect(component.average).toBe(3);
  });

  it('should toggle to True', () => {
    component.showReviews = false;
    component.toggleWriteReview();
    expect(component.showReviews).toBe(true);
  });

  it('should prevent writing a review', () => {
    localStorage.setItem('username', JSON.stringify("testUser@gmail.com"));
    spyOn(service, 'getReviewsForProduct').and.returnValue(of([
      { username: "testUser@gmail.com", timestamp: 1, description: "1", rating: 1 },
      { username: "2", timestamp: 2, description: "2", rating: 2 },
      { username: "3", timestamp: 3, description: "3", rating: 3 },
      { username: "4", timestamp: 4, description: "4", rating: 4 },
      { username: "5", timestamp: 5, description: "5", rating: 5 },
    ]));

    component.getCurrentUser();
    expect(component.reviewWritten).toBe(true);

  });
});