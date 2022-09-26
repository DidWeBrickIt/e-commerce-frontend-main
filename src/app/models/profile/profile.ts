import {User} from "../user/user";
import {Address} from "../address/address";

export class Profile {

    user!: User;
    address!: Address;

    constructor(user: User, address: Address) {
        this.user = user;
        this.address = address;
    }



}