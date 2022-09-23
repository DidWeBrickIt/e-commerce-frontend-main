import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Payment } from '../../models/payment/payment';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})

export class PaymentComponent implements OnInit {
  isDisplayActive: boolean = true;
  isFormActive: boolean = false;

  @Input() payment!: Payment;
  public paymentForm: FormGroup;
  
  @Output() newPaymentEvent = new EventEmitter<Payment>();

  constructor(private fb: FormBuilder,) {
    this.paymentForm = this.fb.group({
      credit_card_number: '', 
      expiration: '',
    })
  }

  ngOnInit(): void {
    this.paymentForm.setValue({
      credit_card_number: this.payment.credit_card_number,
      expiration: this.payment.expiration,})
  }

  updatePayment(): void {
    this.newPaymentEvent.emit(this.paymentForm.value);
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }

  togglePaymentDisplay(): void {
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }

}
