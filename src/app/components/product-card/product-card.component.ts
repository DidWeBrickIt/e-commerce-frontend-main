import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ReadableReview } from 'src/app/models/readable-review';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';

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
  showReviews: boolean = false;
  quantities: number[] = [];
  amount: number = 1;

  reviews :ReadableReview[] = [];

  @Input() productInfo!: Product;

  constructor(private productService: ProductService, private reviewService: ReviewService) { }
  
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
      this.updateQuantity();
    }
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  stopProp(ev: Event) {
    ev.stopPropagation();
  }

  toggleReviews()
  {
    this.showReviews = !this.showReviews;
  }

  getReviewsForProduct()
  {
    this.reviews = [];
    this.reviewService.getReviewsForProduct(this.productInfo.id).subscribe(
      (reviews : ReadableReview[]) => 
      {
        reviews.forEach(element => {
          this.reviews.push(element);  
        });
      }
    );;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
