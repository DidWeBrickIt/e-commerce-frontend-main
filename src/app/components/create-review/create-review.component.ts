import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product';
import { Review } from 'src/app/models/review/review';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent {

  @Input() productInfo!: Product;

  hasError: boolean = false;
  errorMessage: string = "Server error, unable to add your review, please try again later";
  description: string = "";
  rating: number = 0;

  constructor(private reviewService: ReviewService, private router: Router) { }
  onRatingChanged(rating: number) {
    this.rating = rating;
  }

  submitReview() {
    let review: Review = { userId: 0, prodId: this.productInfo.id, timestamp: new Date().getTime() / 1000, description: this.description, rating: this.rating };
    this.reviewService.registerProductReview(review).subscribe(
      (response: Review) => {
        console.log(response);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home']));
      },
      (error) => {
        this.hasError = true;
      }
    );
  }
}