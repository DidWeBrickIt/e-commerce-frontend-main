import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Password } from '../../models/credential/password/password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  isDisplayActive: boolean = true;
  isFormActive: boolean = false;

  @Input() passwordCred = {
    oldPass: '',
    newPass: '',
    username: '',
  };

  updated: Password = {
    oldPass: '',
    newPass: '',
    username: '',
  };

  @Output() newPasswordEvent = new EventEmitter<Password>();

  constructor() {}

  ngOnInit(): void {
    this.updated = this.passwordCred;
  }

  updatePassword(): void {
    this.newPasswordEvent.emit(this.updated);
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }

  togglePasswordDisplay(): void {
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }
}
