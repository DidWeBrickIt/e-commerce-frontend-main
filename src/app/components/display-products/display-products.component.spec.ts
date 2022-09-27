import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { DisplayProductsComponent } from './display-products.component';

describe('DisplayProductsComponent', () => {
  let component: DisplayProductsComponent;
  let fixture: ComponentFixture<DisplayProductsComponent>;
  let service : ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProductsComponent ],
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProductsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search product', () => {
    component.searchProduct();
    expect(component.searchProducts).toEqual(component.allProducts);   
  });

  it('should receive bool', () => {
    component.recieveBool(true);
    expect(component.updatedProductInfo.toggleAcc).toBeTrue();
  });

  it ('should update create product', () => {
    const testProduct1 = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    component.updateCreateProduct(testProduct1);
    expect(component.updatedProductInfo.product).toBe(testProduct1);
  });

  it ('should be initialize', () => {
    const testProduct1: Product = new Product(1, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    const testProduct2: Product = new Product(2, "dirt", 1, "its dirt", 1000.00, "https://i0.wp.com/christianlydemann.com/wp-content/uploads/2018/10/angular-test-one-does-not.jpg?fit=490%2C288&ssl=1");
    const returnValue = [testProduct1, testProduct2];
    spyOn(service, 'getProducts').and.returnValue(of(returnValue));
    component.ngOnInit();

    expect(component.allProducts).toBe(returnValue);
  });

  it('should throw 404 on creating product', () => {

    const error: HttpErrorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404, statusText: 'Not Found'
    });
  
    spyOn(service, 'getProducts').and.returnValue(throwError(error));
    component.ngOnInit();
    expect(component.hasError).toBeTrue();
  });
});
