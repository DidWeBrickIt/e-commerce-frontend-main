import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Profile } from 'src/app/models/profile';
import { Payment } from 'src/app/models/payment';
import { AccountService } from 'src/app/services/account.service';


import { ShippingComponent } from '../shipping/shipping.component';
import { AfterViewInit } from '@angular/core';


import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit, AfterViewInit {
  profileForm: FormGroup
  // Do not delete
  @ViewChild(ShippingComponent, { static: false })
  shippingComponent!: ShippingComponent;
  ngAfterViewInit() {this.shippingData = this.shippingComponent.shippingData}
  shippingData: any;
  // do not delete


  address : Address = {
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  }


  



  
  


  constructor(
      private accountService: AccountService, 
      private fb: FormBuilder) {

    this.profileForm = this.fb.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      country: new FormControl('')})
  }

  ngOnInit(): void {

    this.accountService.getAddressInfo().subscribe(
        (address) => {this.address = address;});
  }

  updateProfile(): void {

    //do not delete
    this.shippingComponent.msgToParent()
    console.log("shipping Data: " + this.shippingData.address1);
    this.address = this.shippingData;
    // do not delete
    


    this.accountService.updateProfile(this.profileForm.value).subscribe();

  }


}
