import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';
import { Notification } from 'src/app/models/notification';
import { NotificationService } from 'src/app/services/notification.service';
import { Order } from 'src/app/models/order/order';
import { ProfileService } from 'src/app/services/profile/profile.service';

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
  orders: Order[] = [];
  userId!: number;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.totalPrice = cart.totalPrice;
      }
    );
  }
}
