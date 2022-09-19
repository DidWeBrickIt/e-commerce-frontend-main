import { Password } from './password';

describe('Password', () => {
  it('should create an instance', () => {
    expect(new Password("old", "new", "new")).toBeTruthy();
  });
});
