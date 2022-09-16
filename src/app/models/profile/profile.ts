import {User} from "../user/user";
import {Payment} from "../payment/payment";
import {Address} from "../address/address";

export class Profile {

    user!: User;
    address!: Address
    payment!: Payment;

    constructor(user: User, address: Address, payment: Payment) {
        this.user = user;
        this.address = address;
        this.payment = payment;
    }



}