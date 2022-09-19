import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product';
import { Review } from 'src/app/models/review/review';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  @Input() productInfo!: Product;

  description: string = "";
  rating: number = 0;

  constructor(private reviewService: ReviewService, private router: Router) { }

  ngOnInit(): void {
  }

  onRatingChanged(rating: number) {
    this.rating = rating;
  }

  submitReview() {
    let review: Review = { id: 0, userId: 0, prodId: this.productInfo.id, timestamp: new Date().getTime() / 1000, description: this.description, rating: this.rating };
    this.reviewService.registerProductReview(review).subscribe(
      (response: Review) => {
        console.log(response);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home']));
      }
      // (error) => {
      //   console.log(`Received error status: ${error.status}`);
      // }
    );
  }
}