export class User {

    firstName: string
    lastName: string
    email: string
    password: string

    constructor (firstName: string, lastName: string, email:string, password: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password;
    }
}
