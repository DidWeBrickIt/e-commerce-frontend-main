import { Profile } from './profile';

describe('Profile', () => {
  it('should create an instance', () => {
    expect(new Profile('fname', 'lname', 'email', 'password')).toBeTruthy();
  });
});