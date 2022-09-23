export class Question {

    securityQuestion: string
    answer: string

    constructor (securityQuestion:string, answer:string) {
        this.securityQuestion = securityQuestion
        this.answer = answer;
    }
}
