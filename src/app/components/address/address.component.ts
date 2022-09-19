import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from "../../models/address/address";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input() address = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  }

  updated: Address = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  }

  @Output() newAddressEvent = new EventEmitter<Address>();
  constructor() { }

  ngOnInit(): void {
    this.updated = this.address
  }

  updateAddress(): void{
    this.updated = this.address
    this.newAddressEvent.emit(this.updated);
  }

}
