import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product';

import { ReadableReview } from 'src/app/models/readable-review/readable-review';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-display-product-reviews',
  templateUrl: './display-product-reviews.component.html',
  styleUrls: ['./display-product-reviews.component.css']
})
export class DisplayProductReviewsComponent implements OnInit {

  @Input() productInfo!: Product;
  reviews: ReadableReview[] = [];
  average: number = 0;
  ratingArray: number[] = [1, 2, 3, 4, 5];
  showReviews: boolean = true;
  reviewWritten: boolean = false;
  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {

    this.getCurrentUser();
  }

  getCurrentUser() {
    let username: string | null = localStorage.getItem("username");

    if (username === null) {
      // not logged in. Not allowed to write reviews
      this.reviewWritten = true;
      this.getReviewsForProduct("");
      return;
    }

    this.getReviewsForProduct(JSON.parse(username));
  }

  getReviewsForProduct(username: string) {
    this.reviews = [];
    this.reviewService.getReviewsForProduct(this.productInfo.id).subscribe(
      (reviews: ReadableReview[]) => {
        reviews.forEach(element => {
          if (element.username === username) {
            this.reviewWritten = true;
          }
          this.reviews.push(element);
        });
        this.calculateAvgRating();
      }
    );
  }
  calculateAvgRating() {
    this.average = this.reviews.reduce((a, b) => a + b.rating, 0) / this.reviews.length;
    console.log(this.average);
  }

  toggleWriteReview() {
    this.showReviews = !this.showReviews;
  }
}
