import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Profile } from 'src/app/models/profile';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  info: Profile = { firstName: '', lastName: '', email: '', password: '' };
  address : Address = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  }
  
  payment : Payment = {
    id: "",
    userId: "",
    cCNum: "",
    cvv: "",
    exp: ""
}

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getUserInfo().subscribe((info) => {
      this.info = info;
    });
    this.accountService.getAddressInfo().subscribe((address) => {
      this.address = address;
    });
  }

  updateProfile(): void {
    let profile = {};
    this.accountService.updateProfile(profile);
    location.reload();
  }
}
