import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user/user';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  // isDisplayActive: boolean = true;
  isFormActive: boolean = false;

  @Input() user!: User;
  public userForm: FormGroup;

  @Output() newUserEvent = new EventEmitter<User>();

  constructor(private fb: FormBuilder,) {
    this.userForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
    })
  }

  ngOnInit(): void {
    this.userForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email
    })
  }

  updateUser(): void {
    this.newUserEvent.emit(this.userForm.value);
    // this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
    this.user.email = this.userForm.value.email;
    this.user.firstName = this.userForm.value.firstName;
    this.user.lastName = this.userForm.value.lastName;
  }

  toggleUserDisplay(): void {
    // this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }
}
