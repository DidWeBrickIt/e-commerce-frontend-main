import { TestBed } from '@angular/core/testing';
import { Notification } from '../models/notification';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add to list', () => {
    const date = new Date(); 
    const testNotif = new Notification("test", date);
    service.addNotification(testNotif);
    expect(service.getNotificationList().length).toBe(1);
  });

  it('should clear list', () => {
    const date = new Date(); 
    const testNotif = new Notification("test", date);
    service.addNotification(testNotif);
    service.clearNotificationList();
    expect(service.getNotificationList().length).toBe(0);
  });
});