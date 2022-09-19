import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  rating: number = 0;
  max: number = 5;
  @Output() ratingUpdated = new EventEmitter();

  ratingArray: number[] = [1, 2, 3, 4, 5];
  constructor() {
  }


  ngOnInit() {
  }

  setRating(i: number) {
    this.rating = i;
    this.ratingUpdated.emit(this.rating);
  }
}
