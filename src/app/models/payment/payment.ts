export class Payment {

  ccn: string;
  cvv: string;
  exp: string;

  constructor(ccn: string, cvv: string, exp: string) {
    this.ccn = ccn;
    this.cvv = cvv;
    this.exp = exp;
  }
}
