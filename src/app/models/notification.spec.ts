import { Notification } from './notification';  
describe('Notification', () => {
    it('should create an instance', () => {
        const date: Date = new Date();
        expect(new Notification("test",date)).toBeTruthy();
    });
 }); 