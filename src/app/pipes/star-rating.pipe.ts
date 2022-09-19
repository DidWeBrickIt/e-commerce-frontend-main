import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {

  private star: string = "assets/images/Star.png";
  private outline: string = "assets/images/Star_Outline.png"
  private halfStar: string = "assets/images/Half_Star.png"

  transform(value: number): unknown {
    if (value === 0) {
      return this.outline;
    }
    if (value === 1) {
      return this.star
    }
    return this.halfStar;
  }

}
