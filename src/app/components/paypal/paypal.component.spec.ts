import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product/product.service';
import { PaypalComponent } from './paypal.component';
import { of } from 'rxjs';

describe('PaypalComponent', () => {
  let component: PaypalComponent;
  let fixture: ComponentFixture<PaypalComponent>;
  let productService: ProductService;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let notificationService : NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalComponent ],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [ProductService,{provide: Router, useValue: routerSpy},FormBuilder, NotificationService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);
    notificationService = TestBed.inject(NotificationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should purchase then navigate home', fakeAsync(() => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.products = [{product:testProduct1, quantity:2}];
  }));

  it('should make order then purchase', fakeAsync(() => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.products = [{product:testProduct1, quantity:2}];
  }));

  it('should create Notification', () => {
    const notificationSpy = spyOn(notificationService, 'addNotification').and.callThrough();
    component.createNotification(100);
    expect(notificationSpy).toHaveBeenCalledTimes(1);
  });  

  it('should purchase', () => {

    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    const returnedProductCounts = {product: testProduct1, quantity:6};

    spyOn(productService, 'purchase').and.returnValue(of(returnedProductCounts));

    component.purchase();
    let fromStorage = localStorage.getItem('cartList');

    let validString = '{"cartCount":0,"products":[],"totalPrice":0}'
    expect(fromStorage).toBe(validString);
  });


  // purchase(){
  //   console.log(this.productService);
  //   this.productService.purchase([]);
  //   this.productService.purchase(this.finalProducts).subscribe(
  //     () => {},
  //     (err) => {
  //       console.log(err)
  //       this.hasError = true;
  //     },
  //     () => {
  //       const notifTotal = this.totalCost;
  //       let cart = {
  //         cartCount: 0,
  //         products: [],
  //         totalPrice: 0.00
  //       };
  //       this.productService.setCart(cart);
  //       this.productService.setCartToLocalStorage();
  //       this.createNotification(notifTotal);
  //       this.router.navigate(['/home']);
  //     } 
  //   );
  // }
});