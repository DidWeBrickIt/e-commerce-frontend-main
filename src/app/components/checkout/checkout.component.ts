import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  finalProducts: {id: number, quantity: number}[] = []; 


  checkoutForm: FormGroup = this.formBuilder.group({
    cardName: ["", [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
    cardNum: ["", [Validators.required, Validators.pattern(/^([0-9]{16}|[0-9]{15})$/)]],
    exp: ["", [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$/)]],
    cvv: ["", [Validators.required, Validators.pattern(/^([0-9]{3}|[0-9]{4})$/)]],
    addOne: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    zipCode: ["", [Validators.required, Validators.pattern(/^([0-9]{5})$/)]]
  });

  constructor(private productService: ProductService, private router: Router, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  onSubmit(): void {
    this.validateAllFormFields(this.checkoutForm);
    if(!this.checkoutForm.valid){ return; }


     this.products.forEach(
      (element) => {
        const id = element.product.id;
        const quantity = element.quantity;
        this.finalProducts.push({id, quantity});
      } 
    );

    if(this.finalProducts.length > 0) {
      this.productService.purchase(this.finalProducts).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err),
        () => {
          let cart = {
            cartCount: 0,
            products: [],
            totalPrice: 0.00
          };
          this.productService.setCart(cart);
          this.router.navigate(['/home']);
        } 
      );

    } else {
      this.router.navigate(['/home']);
    }
  }

    //just makes accessing form easier
    get f() { return this.checkoutForm.controls; }

    //marks all fields as touched 
    validateAllFormFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
        console.log(field);
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
    }

}
