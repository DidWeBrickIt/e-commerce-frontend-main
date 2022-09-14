import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

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

    setCart(latestValue: Cart) {}

  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      imports: [HttpClientModule]
      //providers: [{provide: ProductService, useClass: MockProductService}]
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
    component.addToCart(testProduct1);
    component.addToCart(testProduct1);
    expect(component.products.length).toBe(1);
  });

  it('should add new product', () => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    const testProduct2 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.addToCart(testProduct1);
    component.addToCart(testProduct2);
    expect(component.products.length).toBe(2);
  });

});
