import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Address } from 'src/app/models/address/address';

import { AddressComponent } from './address.component';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressComponent ],
      imports: [HttpClientTestingModule ],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    component.address = new Address("1234 Angular St", "Unit 56", "Portland", "OR", "12345", "USA");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should toggle display', () => {
    component.isDisplayActive = true;
    component.isFormActive = true;
    component.toggleAddressDisplay();
    expect(component.isDisplayActive).toBeFalsy();
    expect(component.isFormActive).toBeFalsy();
  });

  it('should update form', () => {
    component.addressForm.value.address1 = "test";
    component.updateAddress();
    expect(component.address.address1).toBe("test");
  });
});
