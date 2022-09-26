import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'src/app/services/product/product.service';
import { of } from 'rxjs';

import { OrdersComponent } from './orders.component';
import { Product } from 'src/app/models/product/product';
import { Order } from 'src/app/models/order/order';
import { FormBuilder } from '@angular/forms';
import { PaypalComponent } from '../paypal/paypal.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let component2: PaypalComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let fixture2: ComponentFixture<PaypalComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersComponent, PaypalComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ProductService, FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    fixture2 = TestBed.createComponent(PaypalComponent);
    component = fixture.componentInstance;
    component2 = fixture2.componentInstance;
    service = TestBed.inject(ProductService);
    fixture.detectChanges();
    fixture2.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format user orders', () => {
    const testProduct1 = new Product(1, "dirt", 10, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component2.products.push({ product: testProduct1, quantity: 5 });
    spyOn(service, 'getUserId').and.returnValue(of([1]));
    component2.makeOrder();
    let orders: Order[] = component2.orders;
    let product: Product = testProduct1;
    spyOn(service, 'getOrdersByUserId').and.returnValue(of(orders));
    spyOn(service, 'getSingleProduct').and.returnValue(of(product));
    component.formatUserOrders();
    expect(component.orders.length).toEqual(orders.length);
  });

  it('should consolidate orders', () => {
    let orders: { orderId: number, productName: string, productAmount: number, cost: number, time: string }[] = [];
    orders.push({ orderId: 1, productName: "test", productAmount: 5, cost: 500, time: "100000" });
    orders.push({ orderId: 2, productName: "test2", productAmount: 50, cost: 5000, time: "100000" });
    component.consolidateOrders(orders);
    expect(component.consolidatedOrders.length).toEqual(1);
  })

  it('should toggle details', () => {
    let tempBool = !component.showDetails;
    component.toggleDetails(5);
    expect(component.orderDetails).toEqual(5);
    expect(component.showDetails).toEqual(tempBool);
  });

  it('should stop prop', () => {
    let event = new Event('click');
    component.stopProp(event);
  });
});
