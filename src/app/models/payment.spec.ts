import { Payment } from './payment';

describe('Payment', () => {
  it('should create an instance', () => {
    expect(new Payment("Dillon", "IDK", 'ccc', 'cvv', 'exp')).toBeTruthy();
  });
});
