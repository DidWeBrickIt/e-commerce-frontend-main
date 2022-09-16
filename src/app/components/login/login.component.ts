import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Jwt } from 'src/app/models/jwt';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  })
  

  constructor(private authService: AuthService, private router: Router, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.validateAllFormFields(this.loginForm);
    if(!this.loginForm.valid){
      return;
    }

    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (response : Jwt) => {
        this.authService.setJWT(response);
        this.router.navigate(['home'])
      },
      (err) => console.log(err),
    );
  }

  register(): void {
    this.router.navigate(['register']);
  }

  get f() { return this.loginForm.controls; }
  //marks all fields as touched 
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
