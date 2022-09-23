import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';


import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [ProductService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset', () => {
    component.totalPrice= 5.00;
    component.emptyCart();
    expect(component.totalPrice).toEqual(0);
  });


  it('should remove product', () => {
    const testProduct1:Product = new Product(23, "dirt", 15, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    const testProduct2:Product = new Product(25, "dirt", 10, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.products.push({product:testProduct1, quantity:10});
    component.products.push({product:testProduct2, quantity:5});
    component.removeFromCart(testProduct1);
    expect(component.products.length).toEqual(1);
  });

 it('should update quantity', () => {
    const testProduct1:Product = new Product(50, "dirt", 10, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.productsCopy.push({product:testProduct1, quantity:5});
    component.cartCount = 5;
    component.updateQuantity(10,testProduct1);
    expect(component.cartCount).toEqual(10);
  });

  it('can count', () => {
    let numArray = component.counter(5);
    expect(numArray.length).toEqual(5);
  });

});
