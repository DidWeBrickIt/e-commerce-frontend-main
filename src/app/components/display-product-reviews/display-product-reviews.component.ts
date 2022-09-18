import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product';

import { ReadableReview } from 'src/app/models/readable-review/readable-review';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-display-product-reviews',
  templateUrl: './display-product-reviews.component.html',
  styleUrls: ['./display-product-reviews.component.css']
})
export class DisplayProductReviewsComponent implements OnInit {

  @Input() productInfo!: Product;
  reviews :ReadableReview[] = [];
  average : number = 0;
  constructor(private reviewService : ReviewService) {}

  ngOnInit(): void 
  {
    this.getReviewsForProduct();
  }

  getReviewsForProduct()
  {
    this.reviews = [];
    this.reviewService.getReviewsForProduct(this.productInfo.id).subscribe(
      (reviews : ReadableReview[]) => 
      {
        reviews.forEach(element => {
          this.reviews.push(element);  
        });
        this.calculateAvgRating();
      }
    );
  }
  calculateAvgRating()
  {
    this.average = this.reviews.reduce((a, b) => a + b.rating, 0) / this.reviews.length;
  }

}
