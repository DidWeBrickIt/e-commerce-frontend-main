import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  productsCopy: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  subscription!: Subscription;

  @Input() productInfo!: Product;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.productsCopy = JSON.parse(JSON.stringify(this.products));
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  counter(i: number) {
    return new Array(i);
  }

  updateQuantity(newValue: number, product: Product) {
    this.productsCopy.forEach((element) => {
      if (element.product.id == product.id) {
        let temp: number = element.quantity;
        element.quantity = newValue;
        let cart = {
          cartCount: +this.cartCount - temp + +element.quantity,
          products: this.products,
          totalPrice: this.totalPrice - (temp * product.price) + (element.quantity * product.price)
        };
        this.productService.setCart(cart);
        this.productService.setCartToLocalStorage();
      }
    });
  }

  emptyCart(): void {
    this.productService.emptyCart();
    this.productService.setCartToLocalStorage();
  }

  removeFromCart(product: Product): void {

    let inCart = true;

    this.products.forEach(
      (element) => {
        if (element.product == product) {
          let x: number = element.quantity;
          element.quantity -= element.quantity;
          let cart = {
            cartCount: this.cartCount - x,
            products: this.products,
            totalPrice: this.totalPrice - x * product.price
          };
          if (element.quantity === 0) {
            cart.products = cart.products.filter(p => (p.product != product));
          }
          this.productService.setCart(cart);
          this.productService.setCartToLocalStorage();
        }
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
