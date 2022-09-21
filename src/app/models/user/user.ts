export class User {

    firstName: string
    lastName: string
    email: string
    imageurl: string

    constructor (firstName: string, lastName: string, email:string, imageurl: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.imageurl = imageurl
    }
}
