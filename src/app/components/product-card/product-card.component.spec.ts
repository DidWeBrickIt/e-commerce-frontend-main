import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  interface Cart {
    cartCount: number;
    products: {
      product: Product,
      quantity: number
    }[];
    totalPrice: number;
  }

  class MockProductService{

    getCart(): Observable<Cart> {
      const testProduct: Product = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
      const testCart = new BehaviorSubject<Cart>({
        cartCount: 1,
        products: [{product:testProduct, quantity:1}],
        totalPrice: 1.00
      });
      return testCart;
    }

    setCart(latestValue: Cart) {} // showing up as code smell. Double check after tests working if this is part of coverage.

  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.productInfo = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add to product quantity', () => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    const testProduct2 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    const event = new Event('click');
    component.addToCart(testProduct1, event);
    component.addToCart(testProduct2, event);
    expect(component.products[0].quantity).toBe(2);
    expect(component.products.length).toBe(1);
  });

  it('should add new product', () => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    const testProduct2 = new Product(2, "dirt2", 1, "its dirt v2", 2000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    const event = new Event('click');
    component.addToCart(testProduct1, event);
    component.addToCart(testProduct2, event);
    expect(component.products.length).toBe(2);
  });

  it('should be opposite', () => {
    const info = component.showInfo;
    component.toggleInfo();
    expect(info).toEqual(!component.showInfo);
  });

});
