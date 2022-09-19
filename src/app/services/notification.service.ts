import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';

@Injectable({   providedIn: 'root' }) 
export class NotificationService {    
  
  private notificationList: Notification[] = [];    
  
  constructor() { }

  addNotification(notification: Notification) {
    this.notificationList.unshift(notification);
  }
      
  getNotificationList(): Notification[] {
    return this.notificationList;
  }

  clearNotificationList(): void {
    this.notificationList = [];
  }

}