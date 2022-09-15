import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: Router, useValue: routerSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should just navigate home', () => {
    component.onSubmit();
    expect(component.finalProducts.length).toBe(0);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should purchase then navigate home', () => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.products = [{product:testProduct1, quantity:2}];
    component.onSubmit();
    expect(component.finalProducts.length).toBe(1);
    //expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
