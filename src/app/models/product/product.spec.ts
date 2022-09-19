import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1")).toBeTruthy();
  });
});
