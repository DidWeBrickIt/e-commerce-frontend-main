export class Payment {

  credit_card_number: string;
  expiration: string;

  constructor(ccn: string, exp: string) {
    this.credit_card_number = ccn;
    this.expiration = exp;
  }
}
