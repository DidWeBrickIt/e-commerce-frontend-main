export class Address {
    firstname: string
    lastname: string
    address1: string
    address2: string
    city: string
    state: string
    zip: string
    country: string
  
    constructor (
      firstname: string,
      lastname: string,
      address1: string,
      address2: string,
      city: string,
      state: string,
      zip: string,
      country: string
    ) {
      this.firstname = firstname
      this.lastname = lastname
      this.address1 = address1
      this.address2 = address2
      this.city = city
      this.state = state
      this.zip = zip
      this.country = country
    }
}


