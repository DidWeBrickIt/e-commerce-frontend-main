import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.formBuilder.group({
    fname: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
    lname: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    securityQuestion: [null, [Validators.required, Validators.pattern(/^[a-zA-Z' _]*$/)]],
    answer: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9' _]*$/)]]
    //add this validator or something like it to password later
    //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')

  })

  hasError:boolean = false;
  errorMessage:string = "Server error, please try again later";

  constructor(private authService: AuthService, private router: Router, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.validateAllFormFields(this.registerForm);
    
    if (!this.registerForm.valid) {
      return;
    }

    console.log('form submitted');
      this.authService.register(this.registerForm.get('fname')?.value, 
      this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, 
      this.registerForm.get('password')?.value, this.registerForm.get('securityQuestion')?.value, 
      this.registerForm.get('answer')?.value).subscribe(
        () => {
        console.log("New user registered")
        this.hasError = false;
        },
        (err) => {
        console.log(err)
        this.hasError = true;
        if(err.status === 400){
          this.errorMessage = "Email address already in use";
        }
        if(err.status !== 400){
          this.errorMessage = "Server error, please try again later";
        }
      },
        () => this.router.navigate(['login'])
      );

  }

  //just makes accessing form easier
  get f() { return this.registerForm.controls; }

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
