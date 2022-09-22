import { pipe } from 'rxjs';
import { EpochToDatePipe } from './epoch-to-date.pipe';

describe('EpochToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new EpochToDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return readable', () => {
    let input : number = 1663608268;
    const pipe = new EpochToDatePipe();
    expect(pipe.transform(input)).toBeInstanceOf(String);
  });
});