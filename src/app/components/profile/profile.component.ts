import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Profile } from 'src/app/models/profile';
import { Payment } from 'src/app/models/payment';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShippingComponent } from '../shipping/shipping.component';
import { AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild(ShippingComponent, { static: false })
  shippingComponent!: ShippingComponent;
  ngAfterViewInit() {this.shippingData = this.shippingComponent.shippingData}
  
  shippingData: any;

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


  


  info: Profile = { firstName: '', lastName: '', email: '', password: '' };
  
  
  payment : Payment = {
    id: "",
    userId: "",
    cCNum: "",
    cvv: "",
    exp: ""
}


  constructor(private accountService: AccountService, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.accountService.getAddressInfo().subscribe((address) => {
      this.address = address;
      this.info = {firstName:address.firstName, lastName:address.lastName, email:"", password:""};
    });
  }

  updateProfile(): void {
    console.log("shipping Data: " + this.shippingData.address1);
    this.address = this.shippingData;
    
    console.log("hello " + this.address.firstName);
    this.accountService.updateProfile(this.address);
    //location.reload();
  }


}
