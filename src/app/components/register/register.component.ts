import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new UntypedFormGroup({
    fname: new UntypedFormControl(''),
    lname: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })

  hasError:boolean = false;
  errorMessage:string = "Server error, please try again later";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.authService.register(this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe(
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

}
