import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Order } from 'src/app/models/order/order';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';
import { OrdersComponent } from '../orders/orders.component';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [ProductService, {provide: Router, useValue: routerSpy},FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should just navigate home', fakeAsync(() => {
    let spy = spyOn(service, 'purchase').and.returnValue(of([]));
    
    component.onSubmit();
    tick();
    
    expect(component.finalProducts.length).toBe(0);
    expect(spy).not.toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should purchase then navigate home', fakeAsync(() => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.products = [{product:testProduct1, quantity:2}];

    let spy = spyOn(service, 'purchase').and.returnValue(of([]));
    let subSpy = spyOn(service.purchase(component.finalProducts), 'subscribe');
    
    component.onSubmit();
    tick();

    expect(component.finalProducts.length).toBe(0);
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    
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
});
