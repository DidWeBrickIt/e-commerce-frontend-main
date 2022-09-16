import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {

  transform(value:number): unknown {
    // https://www.htmlsymbols.xyz/unicode/U+2B50
    let star = "\u2B50";

  return star.repeat(value);
  }

}
