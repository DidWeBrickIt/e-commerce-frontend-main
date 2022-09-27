import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product/product';
import { Review } from 'src/app/models/review/review';
import { ReviewService } from 'src/app/services/review/review.service';

import { CreateReviewComponent } from './create-review.component';

describe('CreateReviewComponent', () => {
  let component: CreateReviewComponent;
  let fixture: ComponentFixture<CreateReviewComponent>;
  let service: ReviewService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateReviewComponent,
      ],
      imports: [HttpClientTestingModule],
      providers: [ReviewService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateReviewComponent);
    component = fixture.componentInstance;
    component.productInfo = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    service = TestBed.inject(ReviewService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change rating', () => {
    component.onRatingChanged(5);
    expect(component.rating).toBe(5);
  });

  it('should create review', fakeAsync(() => {
    let review: Review = {userId: 0, prodId: 0, timestamp: 0, description: "", rating: 0 };
    let spy = spyOn(service, 'registerProductReview').and.returnValue(of(review));
    let urlSpy = spyOn(router, 'navigateByUrl').and.returnValue(of(true).toPromise());

    component.submitReview();
    tick();
    expect(spy).toHaveBeenCalledBefore(urlSpy);
    tick();
    expect(urlSpy).toHaveBeenCalled();
  }));

});
