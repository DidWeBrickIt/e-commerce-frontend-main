import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from '../../models/address/address';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {

  isDisplayActive: boolean = true;
  isFormActive: boolean = false;

  @Input() address!: Address;
  public addressForm: FormGroup;

  @Output() newAddressEvent = new EventEmitter<Address>();
  constructor(private fb: FormBuilder,
              ) {
    this.addressForm = this.fb.group({
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    })
  }

  ngOnInit(): void {
    this.addressForm.setValue({
      address1: this.address.address1,
      address2: this.address.address2,
      city: this.address.city,
      state: this.address.state,
      zip: this.address.zip,
      country: this.address.country,})

  }

  updateAddress(): void {
    this.newAddressEvent.emit(this.addressForm.value);
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }

  toggleAddressDisplay(): void {
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }
}
