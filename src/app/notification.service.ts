import { Injectable } from '@angular/core';
import { Notification } from './models/notification';
@Injectable({   providedIn: 'root' }) 
export class NotificationService {    
  
  private notificationList: Notification[] = [];    
  
  constructor() { }

  addNotification(notification: Notification) {
    this.notificationList.push(notification);
  }
      
  getNotificationList(): Notification[] {
    return this.notificationList;
  }

}