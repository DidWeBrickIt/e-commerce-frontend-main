import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Payment } from '../../models/payment/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  isDisplayActive: boolean = true;
  isFormActive: boolean = false;

  @Input() payment = {
    credit_card_number: '',
    security_code: '',
    expiration: '',
  };

  updated: Payment = {
    credit_card_number: '',
    security_code: '',
    expiration: '',
  };
  @Output() newPaymentEvent = new EventEmitter<Payment>();

  constructor() {}

  ngOnInit(): void {
    this.updated = this.payment;
  }

  updatePayment(): void {
    this.updated = this.payment;
    this.newPaymentEvent.emit(this.updated);
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }

  togglePaymentDisplay(): void {
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }

}
