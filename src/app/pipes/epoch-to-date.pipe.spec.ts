import { EpochToDatePipe } from './epoch-to-date.pipe';

describe('EpochToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new EpochToDatePipe();
    expect(pipe).toBeTruthy();
  });
});
