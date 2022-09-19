import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
    expect(new Address("Dillon", "Conner", "angular tests", "Suck ln", "crappy town", "ohio", "12345", "USA")).toBeTruthy();
  });
});
