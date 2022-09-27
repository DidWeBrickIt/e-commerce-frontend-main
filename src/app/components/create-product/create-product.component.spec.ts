import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'src/app/services/product/product.service';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateProductComponent } from './create-product.component';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent],
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw 404 on creating product', () => {

    const error: HttpErrorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404, statusText: 'Not Found'
    });
  
    spyOn(service, 'createProduct').and.returnValue(throwError(error));
    component.createProduct();
    expect(component.errorMessage).toBe('There was an error processing your request. Please make sure all fields are of their valid type.');
  });

  it('should catch other errors', () => {
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: '500 internal server error',
      status: 500, statusText: 'idk'
    });
    spyOn(service, 'createProduct').and.returnValue(throwError(error));
    component.createProduct();
    expect(component.errorMessage).toBe('Server error, please try again later');
  });

  it('should close div', () => {
    component.closeDiv();

    expect(component.showForm).toBeTrue();
  });
});
