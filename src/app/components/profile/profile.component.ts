import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Profile } from 'src/app/models/profile';
import { Payment } from 'src/app/models/payment';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileFormGroup = this.fb.group({firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: ""})

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
  firstName: String = ""
    lastName: String = ""
    address1: String = ""
    address2: String = ""
    city: String = ""
    state: String = ""
    zip: String = ""
    country: String = ""

  constructor(private accountService: AccountService, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.accountService.getAddressInfo().subscribe((address) => {
      this.address = address;
      this.info = {firstName:address.firstName, lastName:address.lastName, email:"", password:""};
    });
  }

  updateProfile(): void {
    console.log(this.profileFormGroup);
    console.log("hello " + this.address.address1);
    this.accountService.updateProfile(this.address);
    //location.reload();
  }
}
