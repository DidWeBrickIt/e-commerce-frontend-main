import {User} from "../user/user";
import {Payment} from "../payment/payment";
import {Address} from "../address/address";

export class Profile {

    user!: User;
    payment!: Payment;
    address!: Address;

    constructor(user: User, payment: Payment, address: Address) {
        this.user = user;
        this.address = address;
        this.payment = payment;
    }



}