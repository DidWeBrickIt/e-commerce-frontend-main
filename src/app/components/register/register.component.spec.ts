import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientTestingModule],
      providers:[FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register', () => {
    component.registerForm.get('fname')?.setValue("Dillon");
    component.registerForm.get('lname')?.setValue("Conner");
    component.registerForm.get('email')?.setValue("No@gmail.com");
    component.registerForm.get('password')?.setValue("password");
    component.registerForm.get('securityQuestion')?.setValue("Yes");
    component.registerForm.get('answer')?.setValue("No");
    component.onSubmit();
    expect(component.hasError).toBeFalse();
  });

  it('should no be valid form', () => {
    component.registerForm.get('fname')?.setValue("Dillon");
    component.registerForm.get('lname')?.setValue("Conner");
    component.registerForm.get('email')?.setValue("invalid");
    component.registerForm.get('password')?.setValue("password");
    component.registerForm.get('securityQuestion')?.setValue("Yes");
    component.registerForm.get('answer')?.setValue("No");
    component.onSubmit();
    expect(component.registerForm.valid).toBeFalse();
  });

});
