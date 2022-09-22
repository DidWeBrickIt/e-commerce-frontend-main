import { Payment } from './payment';

describe('Payment', () => {
    it('should create payment', () => {
        expect(new Payment("1234567812345678","123","07/2027")).toBeTruthy();
    })
});
