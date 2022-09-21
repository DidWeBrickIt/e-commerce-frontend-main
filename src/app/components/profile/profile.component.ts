import { Component, OnInit} from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import {Profile} from "../../models/profile/profile";
import {User} from "../../models/user/user";
import {Payment} from "../../models/payment/payment";
import {Address} from "../../models/address/address";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {Password} from "../../models/credential/password/password";
import {ChangeEmailComponent} from "../change-email/change-email.component";
import {Email} from "../../models/credential/email/email";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit{
  currentItem = '';


  profile: Profile={
    user: new User('', '', '', ''),
    address: new Address('','','','','',''),
    payment: new Payment('','','')
    


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
      public dialog: MatDialog) {}

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(
        (profile) => this.profile = profile,
        (err) => console.log(err),
        () => console.log("Profile Retrieved"));
        console.log(this.profile.user.imageurl);
        this.currentItem = this.profile.user.imageurl;

        

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

  changePassword(): void{
    const dialogRef = this.dialog.open(
        ChangePasswordComponent,
        {width: '50%', data: this.passwordCred }
    );

    dialogRef.afterClosed().subscribe(
        (result) => this.passwordCred = result,
        (err) => console.log(err),
        () => console.log(this.passwordCred));
  }

  changeEmail(): void{
    const dialogRef = this.dialog.open(
        ChangeEmailComponent,
        {width: '50%', data: this.emailCred }
    );

    dialogRef.afterClosed().subscribe(
        (result) => this.emailCred = result,
        (err) => console.log(err),
        () => console.log(this.emailCred));
  }


}
