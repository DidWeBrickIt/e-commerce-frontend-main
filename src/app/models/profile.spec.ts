import { Profile } from './profile';

describe('Profile', () => {
  it('should create an instance', () => {
    expect(new Profile("first","last","test@gmail.com","password")).toBeTruthy();
  });
});