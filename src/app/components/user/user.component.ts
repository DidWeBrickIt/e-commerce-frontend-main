import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  isDisplayActive: boolean = true;
  isFormActive: boolean = false;

  @Input() user = {
    firstName: '',
    lastName: '',
    email: '',
  };

  updated: User = {
    firstName: '',
    lastName: '',
    email: '',
  };

  @Output() newUserEvent = new EventEmitter<User>();

  constructor() {}

  ngOnInit(): void {
    this.updated = this.user;
  }

  updateUser(): void {
    this.updated = this.user;
    this.newUserEvent.emit(this.updated);
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }

  toggleUserDisplay(): void {
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }
}
