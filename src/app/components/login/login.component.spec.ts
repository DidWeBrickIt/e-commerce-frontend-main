import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent],
      imports: [HttpClientTestingModule],
      providers: [ LoginComponent, AuthService, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not verify profile 400', () => {
    component.loginForm.get('email')?.setValue("email@email.com");
    component.loginForm.get('password')?.setValue("password");
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: '400 error',
      status: 400, statusText: 'Bad Request'
    });
  
    spyOn(authService, 'login').and.returnValue(throwError(error));
    component.onSubmit();
    expect(component.errorMessage).toBe("Your profile could not be verified. Please check your information and try again.");
  });

  it('should not verify profile 500', () => {
    component.loginForm.get('email')?.setValue("email@email.com");
    component.loginForm.get('password')?.setValue("password");
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: '500 error',
      status: 500, statusText: 'Server Error'
    });
  
    spyOn(authService, 'login').and.returnValue(throwError(error));
    component.onSubmit();
    expect(component.errorMessage).toBe("Server error, please try again later");
  });

  it('should not verify profile invalid form', () => {
    component.loginForm.get('email')?.setValue("invalid");
    component.loginForm.get('password')?.setValue("password");
  
    const spy = spyOn(authService, 'login').and.returnValue(of());
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });

});
