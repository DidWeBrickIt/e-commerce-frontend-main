import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  showInfo: boolean = false;
  quantities: number[] = [];
  amount: number = 0;

  @Input() productInfo!: Product;

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );
    this.updateQuantity();
  }

  updateQuantity(){
   this.quantities = [];
   this.amount = 0;
    for(let i = 1; i < this.productInfo.quantity + 1; i++){
      this.quantities.push(i);
    }
  }

  addToCart(product: Product): void {
    let inCart = false;

    this.products.forEach(
      (element) => {
        if(element.product == product){
          element.quantity = +element.quantity + +this.amount;
          let cart = {
            cartCount: +this.cartCount + +this.amount,
            products: this.products,
            totalPrice: this.totalPrice + (product.price * this.amount)
          };
          this.productService.setCart(cart);
          this.productInfo.quantity -= this.amount;
          this.updateQuantity();
          inCart=true;
          return;
        };
      }
    );

    if(inCart == false){
      let newProduct = {
        product: product,
        quantity: this.amount
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: +this.cartCount + +this.amount,
        products: this.products,
        totalPrice: this.totalPrice + (product.price * this.amount)
      }
      this.productService.setCart(cart);
      this.productInfo.quantity -= newProduct.quantity;
      this.updateQuantity();
    }
      
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
