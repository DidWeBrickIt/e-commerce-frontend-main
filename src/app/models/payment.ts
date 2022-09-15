export class Payment {
  id: string;
  userId: string;
  ccNum: string;
  cvv: string;
  exp: string;

  constructor(
    id: string,
    userId: string,
    ccNum: string,
    cvv: string,
    exp: string
  ) {
    this.id = id;
    this.userId = userId;
    this.ccNum = ccNum;
    this.cvv = cvv;
    this.exp = exp;
  }
}
