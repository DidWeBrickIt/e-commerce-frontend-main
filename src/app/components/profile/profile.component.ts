import { Component, OnInit} from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import {FormBuilder, FormControl} from '@angular/forms';
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

  profileForm = this.fb.group({
    user: new FormControl(User),
    address: new FormControl(Address),
    payment: new FormControl(Payment)
  })

  profile: Profile={
    user: new User('', ''),
    address: new Address('','','','','',''),
    payment: new Payment('','','')

  }

  constructor(
      private profileService: ProfileService,
      private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void{

    this.profileService.getProfileInfo().subscribe(
        (profile) => this.profile = profile,
        (err) => console.log(err),
        () => console.log("Profile Retrieved"));

  }

  updateProfile(): void {
    console.log(this.profileForm.value);
    this.profileService.updateProfile(this.profile).subscribe();
  }


}
