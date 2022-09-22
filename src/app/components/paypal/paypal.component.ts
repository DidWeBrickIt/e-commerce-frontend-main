import { Component, OnInit, Input } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest, ITransactionItem } from 'ngx-paypal';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product/product';
import { Order } from 'src/app/models/order/order';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  hasError:boolean = false;
  errorMessage:string = "Server error, please try again later";
  @Input() totalCost = 0.01;
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  items: ITransactionItem[] = [];
  finalProducts: {id: number, quantity: number}[] = []; 
  orders: Order[] = [];
  userId!: number;
  constructor(
    private productService: ProductService,
    private router: Router,
    private notificationService: NotificationService
    ){

  }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        console.log(cart)
        this.products = cart.products;
        this.totalCost = cart.totalPrice;
        cart.products.forEach(
          product => {
            this.items?.push({
              name:product.product.name,
              quantity:product.quantity.toString(),
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: product.product.price.toString(),
              },
            })
        })
      }
    );
    console.log(this.items)
    this.initConfig();
  }

  makeOrder(){
    this.products.forEach(
      (element) => {
        const id = element.product.id;
        const quantity = element.quantity;
        this.finalProducts.push({id, quantity});
      } 
    );
    
    if(this.finalProducts.length > 0){
      this.productService.getUserId().subscribe((response) => {
        this.userId = response;
        this.finalProducts.forEach((product) => {
          let order: Order = new Order(0,this.userId,product.id,product.quantity,new Date().getTime()/1000);
          this.orders.push(order);
        });
        this.productService.makeOrder(this.orders).subscribe();
      },
      (err) => {
        console.log(err)
        this.hasError = true;
      }
      );
    }
  }

  purchase(){
    console.log(this.finalProducts)
    if(this.finalProducts.length > 0) {
      this.productService.purchase(this.finalProducts).subscribe(
        (resp) => console.log(resp),
        (err) => {
          console.log(err)
          this.hasError = true;
        },
        () => {
          const notifTotal = this.totalCost;
          let cart = {
            cartCount: 0,
            products: [],
            totalPrice: 0.00
          };
          console.log("hey")
          console.log(cart)
          this.productService.setCart(cart);
          this.productService.setCartToLocalStorage();
          this.createNotification(notifTotal);
          this.router.navigate(['/home']);
        } 
      );

    } else {
      this.router.navigate(['/home']);
    }
  }

  createNotification(total:number):void {
    let currentTime: Date = new Date();
    let message: string = `Your order has been processed. Total: $${total}`;
    let notification: Notification = new Notification(message, currentTime);
    this.notificationService.addNotification(notification);
  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.totalCost.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.totalCost.toString()
              }
            }
          },
          items: this.items
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details: string) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
      this.makeOrder();
      this.purchase();
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}