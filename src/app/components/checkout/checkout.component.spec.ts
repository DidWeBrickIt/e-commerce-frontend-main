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
});
