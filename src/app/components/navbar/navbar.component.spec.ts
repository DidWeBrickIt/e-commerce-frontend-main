import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notification } from 'src/app/models/notification';
import { ProductService } from 'src/app/services/product/product.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be opposite', () => {
    const beforeHidden = component.isHidden;
    component.toggleBadgeVisibility();
    expect(beforeHidden).toEqual(!component.isHidden)
  });

  it('should clear list', () => {
    const date = new Date();
    const notif = new Notification("test", date);
    component.notificationList.push(notif);
    component.clearButton();
    expect(component.notificationList.length).toBe(0);
    expect(component.listSize).toBe(0);
  });

  it('should get cart from local storage', () => {
    component.ngOnInit();
  });
});
