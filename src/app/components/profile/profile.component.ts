import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Profile } from 'src/app/models/profile';
import { Payment } from 'src/app/models/payment';
import { AccountService } from 'src/app/services/account.service';

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
    this.accountService.getAddressInfo().subscribe((address) => {
      this.address = address;
      this.info = {firstName:address.firstName, lastName:address.lastName, email:"", password:""};
    });
  }

  updateProfile(): void {
    this.accountService.updateProfile(this.address);
    location.reload();
  }
}
