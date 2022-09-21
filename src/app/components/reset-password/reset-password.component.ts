import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  })

  hasError:boolean = false;
  errorMessage:string = "Server error, please try again later";

  constructor(
      private auth: AuthService,
      private formBuilder: FormBuilder,
      private router: Router,
  ) { }

  ngOnInit(): void {
  }

  get f() { return this.resetForm.controls; }

  onSubmit(): void{
    this.validateAllFormFields(this.resetForm);
    if (!this.resetForm.valid) {
      return;
    }

    this.auth.resetPassword(
        this.resetForm.get('email')?.value,
        this.resetForm.get('password')?.value )
        .subscribe(
            () => console.log("Set Reset"),
            (err) => {
              console.log(err)
              this.hasError = true;
              if(err.status === 400){
                this.errorMessage = "User Not Found";}},
            () => this.router.navigate(['login']));
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });

  }


}
