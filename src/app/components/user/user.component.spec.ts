import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user/user';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    const userIn : User = new User("firstname", "lastname", "testgmail@gmail.com", "testimg.jpg");
    component.user = userIn;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle display', () => {
    let before = component.isDisplayActive;
    let formActive = component.isFormActive;
    component.toggleUserDisplay();
    expect(component.isDisplayActive).toBe(!before);
    expect(component.isFormActive).toBe(!formActive);
  });
});
