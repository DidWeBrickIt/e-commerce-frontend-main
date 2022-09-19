export class Order {
    constructor(
        public id: number, 
        public userId: number, 
        public prodId: number, 
        public quantity: number, 
        public timePurchased: number) {
    }
}