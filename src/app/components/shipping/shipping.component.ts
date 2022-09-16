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
  msgToParent() { this.shippingData.push(this.address); }


  constructor(private accountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accountService.getAddressInfo().subscribe((address) => {
      this.address = address;
      this.info = {firstName:address.firstName, lastName:address.lastName, email:"", password:""};
    });
  }
  
  

}
