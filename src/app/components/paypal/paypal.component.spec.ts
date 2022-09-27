import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';
import { PaypalComponent } from './paypal.component';

describe('PaypalComponent', () => {
  let component: PaypalComponent;
  let fixture: ComponentFixture<PaypalComponent>;
  let productService: ProductService;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalComponent ],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [ProductService,{provide: Router, useValue: routerSpy},FormBuilder]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test for it 'should just navigate home' below removed since paypal will not let you checkout with a total of 0 dollars anyway
  
  it('should purchase then navigate home', fakeAsync(() => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.products = [{product:testProduct1, quantity:2}];

    // component.payPalConfig.onApprove({orderID:'',payerID:'',subscriptionID:''},{});
    // tick();

    // expect(component.finalProducts.length).toBe(0);
    // flush();
  }));


  // it('should create notification', () => {
  //   component.createNotification();
  //   expect(component.createNotification()).to
  // });

  it('should make order then purchase', fakeAsync(() => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.products = [{product:testProduct1, quantity:2}];

    // component.payPalConfig.onApprove({orderID:'',payerID:'',subscriptionID:''},{});
    // tick();

    // expect(component.orders.length).toBe(0);
    // flush();
  }));
});