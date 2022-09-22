import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Address } from 'src/app/models/address/address';
import { Order } from 'src/app/models/order/order';
import { Payment } from 'src/app/models/payment/payment';
import { Product } from 'src/app/models/product/product';
import { Profile } from 'src/app/models/profile/profile';
import { User } from 'src/app/models/user/user';
import { ProductService } from 'src/app/services/product/product.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { OrdersComponent } from '../orders/orders.component';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let service: ProductService;
  let service2: ProfileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [ProductService, ProfileService, {provide: Router, useValue: routerSpy},FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ProductService);
    service2 = TestBed.inject(ProfileService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve profile', fakeAsync(() => {
    let userProf: Profile = new Profile(new User("test", "tester", "test@test.test", "test"), new Payment("test", "test"), new Address("test", "test", "test", "test", "test", "test"));
    let spy = spyOn(service2, 'getProfileInfo').and.returnValue(of(userProf));
    component.ngOnInit();
  }));

  it('should just navigate home', fakeAsync(() => {
    let spy = spyOn(service, 'purchase').and.returnValue(of([]));
    
    component.purchase();
    tick();
    
    expect(component.finalProducts.length).toBe(0);
    expect(spy).not.toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should purchase then navigate home', fakeAsync(() => {
    const testProduct1 = [new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1")];
    component.finalProducts = [{id:1, quantity:2}];
    let spy = spyOn(service, 'purchase').and.returnValue(of(testProduct1));

    component.purchase();
    tick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));


  // it('should create notification', () => {
  //   component.createNotification();
  //   expect(component.createNotification()).to
  // });

  it('should make order then purchase', fakeAsync(() => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.products = [{product:testProduct1, quantity:2}];

    component.onSubmit();
    tick();

    expect(component.orders.length).toBe(0);
  }));

  it('should make an order', fakeAsync(() => {
    const testProduct1 = new Product(1, "dirt", 10, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.products.push({product:testProduct1, quantity:5});
    let spy = spyOn(service, 'getUserId').and.returnValue(of([1]));
    component.makeOrder();
    expect(component.orders.length).toEqual(1);
  }));
});
