export class Payment {
    id: string
    userId: string
    cCNum: string
    cvv: string
    exp: string




    constructor (id: string, userId: string, cCNum: string, cvv: string, exp: string) {
        this.id = id
        this.userId = userId
        this.cCNum = cCNum
        this.cvv = cvv
        this.exp = exp
    }
}
