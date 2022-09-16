import { Payment } from './payment';

describe('Payment', () => {
  it('should create an instance', () => {
    expect(new Payment("Dillon", "IDK","1234567812345678","123","07/2027")).toBeTruthy();
  });
});
