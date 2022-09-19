import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Payment} from "../../models/payment/payment";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() payment ={
    credit_card_number: '',
    security_code: '',
    expiration: '',
  }

  updated: Payment = {
    credit_card_number: '',
    security_code: '',
    expiration: '',
}
  @Output() newPaymentEvent = new EventEmitter<Payment>();

  constructor() { }

  ngOnInit(): void {
    this.updated = this.payment
  }

  updatePayment(): void{
    this.newPaymentEvent.emit(this.updated);
  }
}
