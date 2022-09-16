export class Payment {

  credit_card_number: string;
  security_code: string;
  expiration: string;

  constructor(ccn: string, cvv: string, exp: string) {
    this.credit_card_number = ccn;
    this.security_code = cvv;
    this.expiration = exp;
  }
}
