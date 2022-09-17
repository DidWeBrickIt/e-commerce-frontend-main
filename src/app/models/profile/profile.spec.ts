import { Profile } from './profile';
import {User} from "../user/user";
import {Address} from "../address/address";
import {Payment} from "../payment/payment";

describe('Profile', () => {
  it('should create an instance', () => {

    expect(new Profile(
        new User('first', 'last'),
        new Payment('1234123412341234','111','1234'),
        new Address('123 1 st','a','asdf','asdf','11111','asd')
    )).toBeTruthy();

  });
});