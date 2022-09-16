import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
    expect(new Address("1234 Angular St", "Unit 56", "Portland", "OR", "12345", "USA")).toBeTruthy();
  });
});
