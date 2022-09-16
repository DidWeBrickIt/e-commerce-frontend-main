import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { Profile } from 'src/app/models/profile';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  currentMsgToParent='';
  shippingData: Address[] = [];


  profileFormGroup = this.fb.group({firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: ""})

  info: Profile = { firstName: '', lastName: '', email: '', password: '' };
  shippingAddress :  Address = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  }
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
  msgToParent() { this.shippingData.push(this.address); }


  constructor(private accountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accountService.getAddressInfo().subscribe((address) => {
      this.address = address;
      this.info = {firstName:address.firstName, lastName:address.lastName, email:"", password:""};
    });
  }
  
  updateProfile(): void {
    console.log(this.profileFormGroup);
    console.log("hello " + this.address.address1);
    this.accountService.updateProfile(this.address).subscribe();
    //location.reload();
  }

}
