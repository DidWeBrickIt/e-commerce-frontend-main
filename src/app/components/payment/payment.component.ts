import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  payment: Payment = {
    id: '',
    userId: '',
    ccNum: '',
    cvv: '',
    exp: '',
  };

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getPaymentInfo().subscribe((payment) => {
      this.payment = payment;
    });
  }

  updatePayment(): void {
    this.accountService.updatePaymentInfo(this.payment);
  }
}
