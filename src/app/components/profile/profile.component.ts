import { Component, OnInit} from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import {Profile} from "../../models/profile/profile";
import {User} from "../../models/user/user";
import {Payment} from "../../models/payment/payment";
import {Address} from "../../models/address/address";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit{

  public profile$ = this.profileService.getProfileInfo();
  saved: Profile;
  hasError:boolean = false;
  errorMessage:string = "Server error, unable to load your profile information, please try again later";

  profile: Profile={
    user: new User('', '', '', ''),
    address: new Address('','','','','',''),
    payment: new Payment('','')
  }

  passwordCred: Password={
    oldPass: '',
    newPass: '',
    againPass: ''
  };

  emailCred: Email={
    oldEmail: '',
    newEmail: '',
    againEmail: ''
  }


  constructor(
      private profileService: ProfileService,
      public dialog: MatDialog) {
    this.saved = new Profile(
        new User('','','',''),
        new Payment('',''),
        new Address('','','','','',''));

  }

  ngOnInit(): void {}

  updatePayment(payment: Payment): void{
    this.saved.payment = payment;
  }

  updateAddress(address: Address): void{
    this.saved.address = address;
  }

  updatePic(picture: string): void{
    this.saved.user.imageurl = picture;
  }

  updateUser(user: User): void{
    this.saved.user = user;
  }

  updateProfile(): void {

    const payload =  this.saved
    console.log(payload);
    this.profileService.updateProfile(payload).subscribe(
      () => {},
      (error) => {
        console.log(error);
        this.errorMessage = "Failed to update your profile information, please try again later"
        this.hasError = true;
      }
    );
  }


}
