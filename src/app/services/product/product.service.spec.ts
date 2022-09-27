import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let localStore: any;
  beforeEach(() => {

    localStore = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));


    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cart', () => {
    let validString = '{"cartCount":0,"products":[],"totalPrice":0}'
    localStorage.setItem('cartList', validString);
    spyOn(service, 'setCart');
    service.getCartFromLocalStorage();
    expect(service.setCart).toHaveBeenCalled();
  });
})