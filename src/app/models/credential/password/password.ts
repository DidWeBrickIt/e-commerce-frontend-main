export class Password {

    username: string;
    oldPass: string;
    newPass: string;

    constructor(oldPass: string, newPass: string, username: string) {
        this.oldPass = oldPass;
        this.newPass = newPass;
        this.username = username;
    }

}
