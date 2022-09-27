import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password.component';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of, throwError } from 'rxjs';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: AuthService;
  let profService: ProfileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      imports: [HttpClientTestingModule],
      providers: [FormBuilder, ProfileService, AuthService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    profService = TestBed.inject(ProfileService);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not find user', () => {
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404, statusText: 'Not Found'
    });
  
    spyOn(profService, 'getSecurityQuestion').and.returnValue(throwError(error));
    component.getQuestion("username");
    expect(component.errorMessage).toBe('User Not Found');
  });

  it('should find user question', () => {
    let data = {question: "test"};
    
    spyOn(profService, 'getSecurityQuestion').and.returnValue(of(data));
    component.getQuestion("username");
    expect(component.question).toBe('test');
    expect(component.hasError).toBeFalse();
  });

  it('should not update password because not found', () => {
    component.resetForm.get('email')?.setValue('email@email.com');
    component.resetForm.get('password')?.setValue('password');
    component.resetForm.get('answer')?.setValue('answer');
    
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404, statusText: 'Not Found'
    });
  
    spyOn(authService, 'resetPassword').and.returnValue(throwError(error));
    component.onSubmit();
    expect(component.errorMessage).toBe('User Not Found or the Answer to the Security Question is incorrect');
  });

  it('should not update password because question incorrect', () => {
    component.resetForm.get('email')?.setValue('email@email.com');
    component.resetForm.get('password')?.setValue('password');
    component.resetForm.get('answer')?.setValue('answer');

    const error: HttpErrorResponse = new HttpErrorResponse({
      error: '400 error',
      status: 400, statusText: 'Bad Request'
    });
  
    spyOn(authService, 'resetPassword').and.returnValue(throwError(error));
    component.onSubmit();
    expect(component.errorMessage).toBe('User Not Found or the Answer to the Security Question is incorrect');
  });

  it('should update password', () => {
    component.resetForm.get('email')?.setValue('email@email.com');
    component.resetForm.get('password')?.setValue('password');
    component.resetForm.get('answer')?.setValue('answer');
  
    spyOn(authService, 'resetPassword').and.returnValue(of());
    component.onSubmit();
    expect(component.hasError).toBeFalse();
  });

  it('should not update password because invalid form', () => {
    component.resetForm.get('email')?.setValue('invalidEmail');
    component.resetForm.get('password')?.setValue('password');
  
    const spy = spyOn(authService, 'resetPassword').and.returnValue(of());
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });
});
