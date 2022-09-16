import { Component, OnInit} from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import {Profile} from "../../models/profile/profile";
import {User} from "../../models/user/user";
import {Payment} from "../../models/payment/payment";
import {Address} from "../../models/address/address";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit{

  profile: Profile={
    user: new User('', ''),
    address: new Address('','','','','',''),
    payment: new Payment('','','')

  }

  constructor(
      private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(
        (profile) => this.profile = profile,
        (err) => console.log(err),
        () => console.log("Profile Retrieved"));

  }

  display(): void{
    console.log(this.profile);
  }
  updatePayment(payment: Payment): void{
    this.profile.payment = payment;
    console.log(this.profile.payment);
  }

  updateAddress(address: Address): void{
    this.profile.address = address;
    console.log(this.profile.address);
  }

  updateUser(user: User): void{
    this.profile.user = user;
    console.log(this.profile.user);
  }

  updateProfile(): void {
    const payload =  new Profile(this.profile.user, this.profile.payment, this.profile.address);
    console.log(this.profile);
    this.profileService.updateProfile(payload).subscribe();
  }


}
