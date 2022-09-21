import { pipe } from 'rxjs';
import { EpochToDatePipe } from './epoch-to-date.pipe';

describe('EpochToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new EpochToDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return readable', () => {
    let input : number = 1663608268;
    let expected : string = "9/19/2022, 12:24 PM";
    const pipe = new EpochToDatePipe();
    expect(pipe.transform(input)).toBe(expected);
  });
});