import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';

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
  amount: number = 1;

  @Input() productInfo!: Product;

  @Output() newProductEvent = new EventEmitter<Product>();
  @Output() updateProductEvent = new EventEmitter<string>();

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

  sendProductInfo(prod:Product, ev:Event){
    ev.stopPropagation();
    this.newProductEvent.emit(this.productInfo);
  }

  updateQuantity(){
    this.quantities = [];
    let num = this.productInfo.quantity;
    this.products.forEach((element) => {
      if(this.productInfo.name === element.product.name){
        num -= element.quantity;
      }
    });
    for(let i = 1; i < num + 1; i++){
      this.quantities.push(i);
    }
  }

  addToCart(product: Product, ev: Event): void {

    ev.stopPropagation();
    let inCart = false;

    this.products.forEach(
      (element) => {
        if(element.product.id == product.id){
          element.quantity = +element.quantity + +this.amount;
          let cart = {
            cartCount: +this.cartCount + +this.amount,
            products: this.products,
            totalPrice: this.totalPrice + (product.price * this.amount)
          };
          this.productService.setCart(cart);
          this.productService.setCartToLocalStorage();
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
      this.productService.setCartToLocalStorage();
      this.updateQuantity();
    }
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  stopProp(ev: Event) {
    ev.stopPropagation();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
