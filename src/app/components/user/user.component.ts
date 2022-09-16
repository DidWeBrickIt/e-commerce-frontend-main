import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user = {
    firstName: '',
    lastName: '',
  }

  updated: User = {
    firstName: '',
    lastName: '',
  }

  @Output() newUserEvent = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
    this.updated = this.user
  }

  updateUser(): void{
    this.updated = this.user;
    this.newUserEvent.emit(this.updated);
  }
}
