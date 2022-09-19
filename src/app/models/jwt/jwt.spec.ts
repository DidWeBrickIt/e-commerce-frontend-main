import { Jwt } from "./jwt";


describe('Jwt', () => {
  it('should create an instance', () => {
    expect(new Jwt("token", "role")).toBeTruthy();
  });
});
