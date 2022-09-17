export class Password {

    oldPass: string;
    newPass: string;
    againPass: string;

    constructor(oldP: string, newP: string, againP: string) {
        this.oldPass = oldP;
        this.newPass = newP;
        this.againPass = againP;
    }

}
