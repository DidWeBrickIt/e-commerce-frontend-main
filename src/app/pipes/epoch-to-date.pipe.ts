import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epochToDate'
})
export class EpochToDatePipe implements PipeTransform {

  transform(value: number): string {
    return this.roundDate(new Date(value * 1000).toLocaleString());
  }

  roundDate(date : string) : string
  {
    let dateString = date;
    let amOrPm = dateString.substring(dateString.length - 3);
    dateString = dateString.substring(0, dateString.length - 6) + amOrPm;
    return dateString;
  }
}
