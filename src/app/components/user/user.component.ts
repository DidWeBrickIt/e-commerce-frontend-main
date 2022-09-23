import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user/user';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  isDisplayActive: boolean = true;
  isFormActive: boolean = false;

  @Input() user!: User;
  public userForm: FormGroup;

  @Output() newUserEvent = new EventEmitter<User>();

  constructor(private fb: FormBuilder,) {
    this.userForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
    })
  }

  ngOnInit(): void {
    this.userForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      imageUrl: this.user.imageurl
    })
  }

  updateUser(): void {
    this.newUserEvent.emit(this.userForm.value);
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }

  toggleUserDisplay(): void {
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }
}
